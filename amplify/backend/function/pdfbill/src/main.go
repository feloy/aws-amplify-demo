package main

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"os"
	"strconv"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/jung-kurt/gofpdf"
)

func HandleRequest(ddb *dynamodb.DynamoDB, s3 *s3manager.Uploader) func(ctx context.Context, event events.DynamoDBEvent) error {

	return func(ctx context.Context, event events.DynamoDBEvent) error {
		fmt.Printf("input: %#v\n", event)

		for _, record := range event.Records {
			if record.EventName == "MODIFY" && getPleasePrint(record) {
				fmt.Printf("PRINT\n")
				image := record.Change.NewImage

				owner, found := getStringValue(image, "owner")
				if !found {
					return errors.New("owner field not found")
				}

				customerID, found := getStringValue(image, "customerID")
				if !found {
					return errors.New("customerID field not found")
				}

				user, err := getUserInformation(ddb, owner)
				if err != nil {
					return err
				}

				customer, err := getCustomerInformation(ddb, customerID)
				if err != nil {
					return err
				}

				id, found := getStringValue(image, "id")
				if !found {
					fmt.Println("id field not found")
					return errors.New("id field not found")
				}

				lines, err := getLines(ddb, id)
				if err != nil {
					return err
				}

				pdf, err := print(image, user, customer, lines)
				if err != nil {
					fmt.Println(err.Error())
					return err
				}

				key := "public/" + id + ".pdf"

				err = save(s3, key, pdf)
				if err != nil {
					fmt.Println(err.Error())
					return err
				}
			}
		}
		return nil
	}
}

func main() {
	region, found := os.LookupEnv("REGION")
	if !found {
		return
	}
	session := session.Must(session.NewSession())
	ddb := dynamodb.New(session, aws.NewConfig().WithRegion(region))
	s3 := s3manager.NewUploader(session)

	lambda.Start(HandleRequest(ddb, s3))
}

func getStringValue(image map[string]events.DynamoDBAttributeValue, field string) (string, bool) {
	if _, found := image[field]; !found {
		return "", false
	}
	return image[field].String(), true
}

func getPleasePrint(record events.DynamoDBEventRecord) bool {
	return !isPleasePrint(record.Change.OldImage) && isPleasePrint(record.Change.NewImage)
}

func isPleasePrint(image map[string]events.DynamoDBAttributeValue) bool {
	if _, found := image["pleasePrint"]; !found {
		return false
	}
	return image["pleasePrint"].Boolean()
}

func getUserInformation(ddb *dynamodb.DynamoDB, owner string) (map[string]*dynamodb.AttributeValue, error) {
	tableName, found := os.LookupEnv("API_BILLING_USERTABLE_NAME")
	if !found {
		return nil, errors.New("API_BILLING_USERTABLE_NAME environment variable is not defined")
	}
	input := &dynamodb.QueryInput{
		TableName:              aws.String(tableName),
		IndexName:              func(s string) *string { return &s }("byOwner"),
		KeyConditionExpression: aws.String("#O = :o"),
		ExpressionAttributeNames: map[string]*string{
			"#O": func(s string) *string { return &s }("owner"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":o": {S: &owner},
		},
	}
	result, err := ddb.Query(input)
	if err != nil {
		return nil, err
	}
	if len(result.Items) != 1 {
		return nil, errors.New("Error getting user information")
	}
	return result.Items[0], nil
}

func getCustomerInformation(ddb *dynamodb.DynamoDB, customerID string) (map[string]*dynamodb.AttributeValue, error) {
	tableName, found := os.LookupEnv("API_BILLING_CUSTOMERTABLE_NAME")
	if !found {
		return nil, errors.New("API_BILLING_CUSTOMERTABLE_NAME environment variable is not defined")
	}
	input := &dynamodb.QueryInput{
		TableName:              aws.String(tableName),
		KeyConditionExpression: aws.String("#id = :id"),
		ExpressionAttributeNames: map[string]*string{
			"#id": func(s string) *string { return &s }("id"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":id": {S: &customerID},
		},
	}
	result, err := ddb.Query(input)
	if err != nil {
		return nil, err
	}
	if len(result.Items) != 1 {
		return nil, errors.New("Error getting customer information")
	}
	return result.Items[0], nil
}

func getLines(ddb *dynamodb.DynamoDB, billID string) ([]map[string]*dynamodb.AttributeValue, error) {
	tableName, found := os.LookupEnv("API_BILLING_LINETABLE_NAME")
	if !found {
		return nil, errors.New("API_BILLING_LINETABLE_NAME environment variable is not defined")
	}
	input := &dynamodb.QueryInput{
		TableName:              aws.String(tableName),
		IndexName:              func(s string) *string { return &s }("byBillCreation"),
		KeyConditionExpression: aws.String("#billid = :id"),
		ExpressionAttributeNames: map[string]*string{
			"#billid": func(s string) *string { return &s }("billID"),
		},
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":id": {S: &billID},
		},
	}
	result, err := ddb.Query(input)
	if err != nil {
		return nil, err
	}
	return result.Items, nil
}

func print(image map[string]events.DynamoDBAttributeValue, user map[string]*dynamodb.AttributeValue, customer map[string]*dynamodb.AttributeValue, lines []map[string]*dynamodb.AttributeValue) (*bytes.Buffer, error) {
	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.AddPage()

	top := pdf.GetY()
	middle := 120.0

	pdf.SetFont("Arial", "", 12)

	// User
	pdf.CellFormat(0, 6, *user["firstname"].S+" "+*user["lastname"].S, "", 1, "", false, 0, "")
	pdf.MultiCell(0, 6, *user["address"].S, "", "", false)

	pdf.CellFormat(0, 6, *user["siret"].S, "", 1, "", false, 0, "")
	pdf.CellFormat(0, 6, *user["email"].S, "", 1, "", false, 0, "")
	pdf.CellFormat(0, 6, *user["phone"].S, "", 1, "", false, 0, "")

	bottom1 := pdf.GetY()

	// Customer
	pdf.SetXY(middle, top)
	pdf.CellFormat(0, 6, *customer["name"].S, "", 1, "", false, 0, "")
	pdf.SetX(middle)
	pdf.MultiCell(0, 6, *customer["address"].S, "", "", false)

	pdf.SetX(middle)
	pdf.CellFormat(0, 6, *customer["siret"].S, "", 1, "", false, 0, "")
	bottom2 := pdf.GetY()

	_ = bottom1
	_ = bottom2

	next := bottom1
	if bottom2 > bottom1 {
		next = bottom2
	}

	// Bill
	pdf.SetY(6 + next)
	serialnum, _ := getStringValue(image, "serialnum")
	date, _ := getStringValue(image, "createdAt")
	date = date[:10]
	pdf.CellFormat(0, 6, "Bill #"+serialnum+", date: "+date, "", 1, "", false, 0, "")

	pdf.CellFormat(0, 6, "", "", 1, "", false, 0, "")

	// Lines
	pdf.SetFont("Arial", "B", 12)
	pdf.CellFormat(15, 8, "Qty", "1", 0, "R", false, 0, "")
	pdf.CellFormat(125, 8, "Designation", "1", 0, "L", false, 0, "")
	pdf.CellFormat(25, 8, "Unit price", "1", 0, "R", false, 0, "")
	pdf.CellFormat(25, 8, "Total price", "1", 1, "R", false, 0, "")

	pdf.SetFont("Arial", "", 12)
	var grandTotal float64
	for _, line := range lines {
		total, err := getLineTotal(line)
		grandTotal += total
		if err != nil {
			return nil, err
		}
		pdf.CellFormat(15, 8, *line["quantity"].N, "1", 0, "R", false, 0, "")
		pdf.CellFormat(125, 8, *line["title"].S, "1", 0, "L", false, 0, "")
		pdf.CellFormat(25, 8, *line["cost"].N, "1", 0, "R", false, 0, "")
		pdf.CellFormat(25, 8, fmt.Sprintf("%.2f", total), "1", 1, "R", false, 0, "")
	}
	pdf.CellFormat(165, 8, "Total", "", 0, "R", false, 0, "")
	pdf.CellFormat(25, 8, fmt.Sprintf("%.2f", grandTotal), "", 1, "R", false, 0, "")

	var buf bytes.Buffer
	pdf.Output(&buf)

	return &buf, nil
}

func getLineTotal(line map[string]*dynamodb.AttributeValue) (float64, error) {
	qty, err := strconv.Atoi(*line["quantity"].N)
	if err != nil {
		return 0, err
	}
	cost, err := strconv.ParseFloat(*line["cost"].N, 64)
	if err != nil {
		return 0, err
	}
	return float64(qty) * cost, nil
}

func save(s3 *s3manager.Uploader, key string, pdf *bytes.Buffer) error {
	bucket, found := os.LookupEnv("STORAGE_PDFSTORE_BUCKETNAME")
	if !found {
		return errors.New("STORAGE_PDFSTORE_BUCKETNAME environment variable is not defined")
	}
	fmt.Printf("save bucket:key %s:%s", bucket, key)
	_, err := s3.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(key),
		Body:   pdf,
	})
	if err != nil {
		return err
	}
	return nil
}
