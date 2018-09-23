const { graphql } = require('graphql');
const schema = require('./schema');

module.exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event, null, 2));

  const { httpMethod, body } = event;
  
  switch (httpMethod) {
    case 'POST': {
      const { query } = JSON.parse(body);
      return graphql(schema, query)
        .then(result => {
          callback(null, {
            statusCode: 200,
            body: JSON.stringify(result)
          })
        })
        .catch(err => callback(null, { 
          statusCode: 500,
          body: JSON.stringify({ message: err })
        }));
    }
    case 'GET':
    case 'HEAD':
    case 'OPTIONS':
    case 'PUT':
    case 'PATCH':
    case 'DELETE':
    default:
      callback(null, {
        statusCode: 405,
        body: JSON.stringify({
          message: `${httpMethod} method not supported. Use POST requests with GraphQL syntax to access user data.`
        })
      });
      break;
  }

}
