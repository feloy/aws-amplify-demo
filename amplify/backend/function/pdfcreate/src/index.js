/* Amplify Params - DO NOT EDIT
	API_BILLING_BILLTABLE_ARN
	API_BILLING_BILLTABLE_NAME
	API_BILLING_CUSTOMERTABLE_ARN
	API_BILLING_CUSTOMERTABLE_NAME
	API_BILLING_GRAPHQLAPIENDPOINTOUTPUT
	API_BILLING_GRAPHQLAPIIDOUTPUT
	API_BILLING_LINETABLE_ARN
	API_BILLING_LINETABLE_NAME
	API_BILLING_USERTABLE_ARN
	API_BILLING_USERTABLE_NAME
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

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {
  //eslint-disable-line
  console.log("event", JSON.stringify(event, null, 2));
  for (let i = 0; i < event.Records.length; i++) {
    const record = event.Records[i];
    console.log("event id", record.eventID);
    console.log("event name", record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
    if (record.eventName == "MODIFY" && getPleasePrint(record)) {

      user = await getUserInformation(ddb, getOwner(record));
      console.log({user});

      customer = await getCustomerInformation(ddb, getCustomerID(record));
      console.log({customer});

      await print(record.dynamodb.NewImage, user, customer);
    }
  }
};

getPleasePrint = (record) => {
  return !isPleasePrint(record.dynamodb.OldImage) && isPleasePrint(record.dynamodb.NewImage);
}

isPleasePrint = (image) => {
  return image.pleasePrint && image.pleasePrint.BOOL;
}

print = async (bill, user, customer) => {
  const pdf = new FPDF();
  pdf.CreatePDF();
  pdf.AddPage();

  const top = pdf.GetY()
  const middle = 120

  pdf.SetFont('Arial', 'I');

  // User
  pdf.Cell(0, 6, user.firstname.S + " " + user.lastname.S, 0, 1);
  let parts = user.address.S.split('\n');
  for (let i=0; i<parts.length; i++) {
    pdf.Cell(0, 6, parts[i], 0, 1);
  }
  pdf.Cell(0, 6, user.siret.S, 0, 1);
  pdf.Cell(0, 6, user.email.S, 0, 1);
  pdf.Cell(0, 6, user.phone.S, 0, 1);
  const bottom1 = pdf.GetY()

  // Customer
  pdf.SetXY(middle, top);
  pdf.Cell(0, 6, customer.name.S, 0, 1);
  parts = customer.address.S.split('\n');
  for (let i=0; i<parts.length; i++) {
    pdf.SetX(middle);
    pdf.Cell(0, 6, parts[i], 0, 1);
  }
  pdf.SetX(middle);
  pdf.Cell(0, 6, customer.siret.S, 0, 1);
  const bottom2 = pdf.GetY()

  // Bill
  pdf.SetY(6 + Math.max(bottom1, bottom2));
  pdf.Cell(0, 6, "Bill #" + bill.serialnum.S + ", date: " + toDate(bill.createdAt.S));

  pdf.Cell(0, 6, "", 0, 1);

  const content = pdf.Output('S', '', true);
  const key = 'public/' + bill.id.S + '.pdf';
  const ok = await writeToBucket(key, content);
  if (ok) {
    await setPdfUrl(bill.id.S, bill.id.S+".pdf")
  }
}

toDate = (s) => {
  return s.substring(0, 10);
}

writeToBucket = async (key, content) => {
  const params = {
    Bucket: process.env.STORAGE_PDFSTORE_BUCKETNAME,
    Key: key,
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
    console.log("ERROR", err);fom
  }
}

// Returns the `owner` of the record
getOwner = (record) => {
  owner = record.dynamodb.NewImage.owner.S;
  return owner;
}

// Returns the `customerID` of the record
getCustomerID = (record) => {
  return record.dynamodb.NewImage.customerID.S;
}

// Get user information
async function getUserInformation(ddb, owner) {
  var params = {
    TableName: process.env.API_BILLING_USERTABLE_NAME,
    IndexName: "byOwner",
    KeyConditionExpression: "#O = :o",
    ExpressionAttributeNames: {
      "#O": "owner"
    },
    ExpressionAttributeValues: {
      ":o": { "S": owner }
    }
  };

  try {
    data = await ddb.query(params).promise();
    if (data.Items.length > 0) {
      return data.Items[0];
    } else {
      return "";
    }
  } catch (err) {
    console.log("ERROR", err);
  }
}

// Get customer information
async function getCustomerInformation(ddb, customerID) {
  var params = {
    TableName: process.env.API_BILLING_CUSTOMERTABLE_NAME,
    KeyConditionExpression: "#id = :id",
    ExpressionAttributeNames: {
      "#id": "id"
    },
    ExpressionAttributeValues: {
      ":id": { "S": customerID }
    }
  };

  try {
    data = await ddb.query(params).promise();
    if (data.Items.length > 0) {
      return data.Items[0];
    } else {
      return "";
    }
  } catch (err) {
    console.log("ERROR", err);
  }
}
