const AWS = require('aws-sdk');
const seedUsers = require('./seed-users')(10);

const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' });

documentClient.batchWrite({
  RequestItems: {
    'usersTable-dev': seedUsers.map(user => ({
      PutRequest: {
        Item: user
      }
    }))
  }
}, (err, data) => {
  if (err) console.log('Failed to seed: ', err);
  else console.log('Seed succesful! \n', seedUsers);
});