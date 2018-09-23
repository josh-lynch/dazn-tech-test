const AWS = require('aws-sdk');
const {
  GraphQLSchema, GraphQLObjectType, GraphQLInt
} = require('graphql');
const UserType = require('./user-type');

const tableName = process.env.TABLE_NAME;
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-2' });

const QuerySchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: {
          id: { name: 'id', type: GraphQLInt }
        },
        resolve: (root, { id }) => {
          const params = {
            TableName: tableName,
            Key: { id }
          };
          return new Promise((resolve, reject) => {
            documentClient.get(params, (err, res) => {
              if (err) reject(err);
              else resolve(res);
            });
          })
            .catch(console.log);
        }
      }
    }
  })
});

module.exports = QuerySchema;
