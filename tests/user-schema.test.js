const {
  GraphQLList, GraphQLInt, GraphQLBoolean
} = require('graphql');
const chai = require('chai');
const UserType = require('../schema/user-type');

const expect = chai.expect;

describe('User Schema', () => {
  it('Should have a \'id\' field of type Int', () => {
    expect(UserType.getFields()).to.have.property('id');
    expect(UserType.getFields().id.type).to.deep.equals(GraphQLInt);
  });
  
  it('Should have a \'currentStreams\' field of type List(Int)', () => {
    expect(UserType.getFields()).to.have.property('currentStreams');
    expect(UserType.getFields().currentStreams.type).to.deep.equals(GraphQLList(GraphQLInt));
  });

  it('Should have a \'canStartNewStream\' field of type Boolean', () => {
    expect(UserType.getFields()).to.have.property('canStartNewStream');
    expect(UserType.getFields().canStartNewStream.type).to.deep.equals(GraphQLBoolean);
  });
});