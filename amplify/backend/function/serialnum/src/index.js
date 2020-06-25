/**
 * Ths function is triggred when a Bill record is created or updated.
 * This function is intended to add the `serialnum` field of the bill
 * will an auto-incremented value of the form YYYYMMNNNN
 * where NNNN is an auto-increment on the bills of the month YYYYMM.
 */
const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = async (event) => {

  for (let i=0; i<event.Records.length; i++) {
    const record = event.Records[i];
    if (record.eventName == "INSERT") {
      const ddbTable = tableName(record);
      const prefix = getSerialPrefix(record)
      const owner = getOwner(record);
      const last = await queryLastSerialnum(ddb, ddbTable, owner, prefix);
      const suffix = getNextSuffix(last);
      await setSerialnum(ddb, record, ddbTable, prefix + suffix);
    }
  }
};

// returns the table on which the event occurred
tableName = (record) => {
  ddbARN = record['eventSourceARN'];
  return ddbARN.split(':')[5].split('/')[1];
}

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
  console.log("begin", begin);
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
    console.log("data after await", data);
    if (data.Items.length > 0) {
      return data.Items[0].serialnum.S;
    } else {
      return "";
    }
  } catch (err) {
    console.log("ERROR", err);
  }
}

// Set serialnum for a record
async function setSerialnum(ddb, record, ddbTable, serialnum) {
  var params = {
    TableName: ddbTable,
    Key: {
      'id': { "S": record.dynamodb.Keys.id.S }
    },
    ExpressionAttributeNames: {
      "#S": "serialnum"
    },
    ExpressionAttributeValues: {
      ":s": {
        S: serialnum
      }
    },
    ReturnValues: "ALL_NEW",
    UpdateExpression: "SET #S = :s"
  };

  try {
    data = await ddb.updateItem(params).promise();
    console.log("new data", data);
  } catch (err) {
    console.log("ERROR", err);
  }
}
