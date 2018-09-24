const { expect } = require('chai');
const lambdaLocal = require('lambda-local');

const lambdaConfig = Object.freeze({
  lambdaPath: 'index.js',
  profilePath: '~/.aws/credentials',
  profileName: 'default',
  timeoutMs: 3000,
  verboseLevel: 0
});

const allowedRequests = [
  'POST'
];

const disallowedRequests = [
  'GET',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
  'HEAD'
];

describe('API', () => {
  
  it('Should respond with a statusCode to any request', () => {
    [...allowedRequests, ...disallowedRequests].forEach((httpMethod) => {
      const event = {
        httpMethod, body: JSON.stringify({ query: { id: 0 } })
      }
      lambdaLocal.execute(Object.assign({}, lambdaConfig, {
        event
      })).then((res) => {
        expect(res).to.have.property('statusCode');
      }).catch((err) => {
        console.log(err);
      });
    });
  });

  it('Should respond with a 200 statusCode to any allowed request', () => {
    const event = {
      httpMethod: 'POST', body: JSON.stringify({ query: { id: 0 } })
    }

    lambdaLocal.execute(Object.assign({}, lambdaConfig, {
      event
    })).then((res) => {
      expect(res.statusCode).to.equal(200);
    }).catch((err) => {
      console.log(err);
    });
  });
  
  it('Should respond with a 405 statusCode to any disallowed request', () => {
    disallowedRequests.forEach((httpMethod) => {
      const event = {
        httpMethod, body: JSON.stringify({ query: { id: 0 } })
      }

      lambdaLocal.execute(Object.assign({}, lambdaConfig, {
        event
      })).then((res) => {
        expect(res.statusCode).to.equal(405);
      }).catch((err) => {
        console.log(err);
      });
    }); 
  });

});