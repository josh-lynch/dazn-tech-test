const AWS = require('aws-sdk');

const tableName = process.env.TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' });

module.exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2));

  const params = {
    TableName: tableName,
    Key: {
      id: 2
    }
  };
  
  documentClient.get(params, (err, data) => {
    if (err) callback(err, null);
    else {
      const response = {
        statusCode: 200,
        body: JSON.stringify(data)
      }
      callback(null, response);
    }
  });

}
