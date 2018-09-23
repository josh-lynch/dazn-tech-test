const {
  GraphQLList, GraphQLInt, GraphQLBoolean
} = require('graphql');
const { expect } = require('chai');
const UserType = require('../schema/user-type');

const resolvertests = [
  { 
    description: 'Should resolve same id as it received',
    property: 'id',
    data: { id: 1 },
    value: 1
  },
  { 
    description: 'Should resolve the same currentStreams as it received',
    property: 'currentStreams',
    data: { currentStreams: [1, 2, 3] },
    value: [1, 2, 3]
  },
  { 
    description: 'Should resolve canStartNewStream true if less than 3 currentStreams received',
    property: 'canStartNewStream',
    data: { currentStreams: [1, 2] },
    value: true
  },
  { 
    description: 'Should resolve canStartNewStream false if 3 currentStreams received',
    property: 'canStartNewStream',
    data: { currentStreams: [1, 2, 3] },
    value: false
  }
]

describe('User Resolver', () => {

  const userFields = UserType.getFields();
  
  resolvertests.forEach(({ description, property, data, value }) => {
    it(description, () => {
      expect(userFields[property].resolve({ Item: data })).to.deep.equal(value);
    });
  });

});