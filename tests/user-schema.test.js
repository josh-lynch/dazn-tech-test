const {
  GraphQLList, GraphQLInt, GraphQLBoolean
} = require('graphql');
const { expect } = require('chai');
const UserType = require('../schema/user-type');

const fieldTests = [
  { property: 'id', type: GraphQLInt },
  { property: 'currentStreams', type: GraphQLList(GraphQLInt) },
  { property: 'canStartNewStream', type: GraphQLBoolean }
]

describe('User Schema', () => {
  
  const userFields = UserType.getFields();

  fieldTests.forEach(({ property, type }) => {
    it(`Should have a '${property}' field of type ${type}`, () => {
      expect(userFields).to.have.property(property);
      expect(userFields[property].type).to.deep.equals(type);
    });
  });

});