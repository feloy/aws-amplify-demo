/* Amplify Params - DO NOT EDIT
	API_BILLING_BILLTABLE_ARN
	API_BILLING_BILLTABLE_NAME
	API_BILLING_GRAPHQLAPIENDPOINTOUTPUT
	API_BILLING_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
/**
 * Ths function is triggred when a Bill record is created or updated.
 * This function is intended to add the `serialnum` field of the bill
 * will an auto-incremented value of the form YYYYMMNNNN
 * where NNNN is an auto-increment on the bills of the month YYYYMM.
 */
const AWS = require('aws-sdk');
const https = require('https');
const urlParse = require("url").URL;

AWS.config.update({ region: process.env.REGION });

const appsyncUrl = process.env.API_BILLING_GRAPHQLAPIENDPOINTOUTPUT;
const region = process.env.REGION;
const endpoint = new urlParse(appsyncUrl).hostname.toString();

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {

  for (let i = 0; i < event.Records.length; i++) {
    const record = event.Records[i];
    if (record.eventName == "INSERT") {
      const ddbTable = process.env.API_BILLING_BILLTABLE_NAME;
      const prefix = getSerialPrefix(record)
      const owner = getOwner(record);
      const last = await queryLastSerialnum(ddb, ddbTable, owner, prefix);
      const suffix = getNextSuffix(last);
      await setSerialnum(record.dynamodb.Keys.id.S, prefix + suffix);
    }
  }
};

// returns the prefix YYYYMM from the creation date YYYY-MM-dd...:
getSerialPrefix = (record) => {
  createdAt = record.dynamodb.NewImage.createdAt.S;
  if (createdAt.length >= 7) {
    return createdAt.substring(0, 4) + createdAt.substring(5, 7);
  }
}

// Returns the `owner` of the record
getOwner = (record) => {
  owner = record.dynamodb.NewImage.owner.S;
  return owner;
}

// Returns the suffix by incrementing the last one
function getNextSuffix(last) {
  if (last.length > 0) {
    suffix = "" + (1 + parseInt(last.substring(6), 10));
    return suffix.padStart(4, "0");
  } else {
    return "0001";
  }
}

// Get serialnum of latest bill for this month
async function queryLastSerialnum(ddb, ddbTable, owner, prefix) {
  var begin = prefix.substring(0, 4) + "-" + prefix.substring(4, 6);
  var params = {
    TableName: ddbTable,
    IndexName: "byOwnerCreation",
    KeyConditionExpression: "#O = :o and begins_with(#C, :c)",
    FilterExpression: " #S >= :s",
    ExpressionAttributeNames: {
      "#O": "owner",
      "#C": "createdAt",
      "#S": "serialnum"
    },
    ExpressionAttributeValues: {
      ":o": { "S": owner },
      ":s": { "S": prefix },
      ":c": { "S": begin }
    },
    ScanIndexForward: false,
  };

  try {
    data = await ddb.query(params).promise();
    if (data.Items.length > 0) {
      return data.Items[0].serialnum.S;
    } else {
      return "";
    }
  } catch (err) {
    console.log("ERROR", err);
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

// Set serialnum for a record
async function setSerialnum(id, serialnum) {
  const req = new AWS.HttpRequest(appsyncUrl, region);

  const item = {
    input: {
      serialnum: serialnum,
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
