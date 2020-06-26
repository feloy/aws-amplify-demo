/* Amplify Params - DO NOT EDIT
	API_BILLING_BILLTABLE_ARN
	API_BILLING_BILLTABLE_NAME
	API_BILLING_GRAPHQLAPIENDPOINTOUTPUT
	API_BILLING_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
	STORAGE_PDFSTORE_BUCKETNAME
Amplify Params - DO NOT EDIT */var FPDF = require('fpdf-njs/fpdf');
var AWS = require('aws-sdk');
const https = require('https');
const urlParse = require("url").URL;

var region = process.env.REGION
AWS.config.update({ region: region });
const s3 = new AWS.S3();

const appsyncUrl = process.env.API_BILLING_GRAPHQLAPIENDPOINTOUTPUT;
const endpoint = new urlParse(appsyncUrl).hostname.toString();

exports.handler = async (event) => {
  //eslint-disable-line
  console.log("event", JSON.stringify(event, null, 2));
  for (let i = 0; i < event.Records.length; i++) {
    const record = event.Records[i];
    console.log("event id", record.eventID);
    console.log("event name", record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
    if (record.eventName == "MODIFY" && getPleasePrint(record)) {
      console.log("===> PRINT <===");
      await print(record.dynamodb.NewImage);
    }
  }
};

getPleasePrint = (record) => {
  return !isPleasePrint(record.dynamodb.OldImage) && isPleasePrint(record.dynamodb.NewImage);
}

isPleasePrint = (image) => {
  return image.pleasePrint && image.pleasePrint.BOOL;
}

print = async (bill) => {
  const pdf = new FPDF();
  pdf.CreatePDF();
  pdf.AddPage();
  pdf.SetFont('Arial', 'B', 16);
  pdf.Cell(40, 10, bill.title.S);
  const content = pdf.Output('S');
  const ok = await writeToBucket(bill.id.S, content);
  if (ok) {
    await setPdfUrl(bill.id.S, bill.id.S+".pdf")
  }
}

writeToBucket = async (key, content) => {
  const params = {
    Bucket: process.env.STORAGE_PDFSTORE_BUCKETNAME,
    Key: key + '.pdf',
    Body: content
  };

  try {
    const result = await s3.upload(params).promise();
    console.log("uploaded", result);
    return true;
  } catch (err) {
    console.log("ERROR", err);
    return false;
  }
}


const graphqlQuery = `
mutation updateBill($input: UpdateBillInput!, $condition: ModelBillConditionInput) {
  updateBill(input: $input, condition: $condition) {
    __typename
    id
    serialnum
    title
    customerID
    customer {
      __typename
      id
      name
      address
      siret
      createdAt
      updatedAt
      owner
      bills {
        __typename
        nextToken
      }
    }
    lines {
      __typename
      items {
        __typename
        id
        billID
        title
        quantity
        cost
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
    createdAt
    owner
    updatedAt
  }
}`

// Set pdfUrl for a record
async function setPdfUrl(id, pdfUrl) {
  const req = new AWS.HttpRequest(appsyncUrl, region);

  const item = {
    input: {
      pdfUrl: pdfUrl,
      id: id
    }
  };

  req.method = "POST";
  req.headers.host = endpoint;
  req.headers["Content-Type"] = "application/json";
  req.body = JSON.stringify({
    query: graphqlQuery,
    operationName: "updateBill",
    variables: item
  });

  // IAM Auth
  const signer = new AWS.Signers.V4(req, "appsync", true);
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

  try {
    await new Promise((resolve, reject) => {
      const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
        result.on('data', (data) => {
          resolve(JSON.parse(data.toString()));
        });
      });

      httpRequest.write(req.body);
      httpRequest.end();
    });
  } catch (err) {
    console.log("ERROR", err);
  }
}
