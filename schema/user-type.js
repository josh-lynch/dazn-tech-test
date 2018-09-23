const {
  GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLBoolean
} = require('graphql');

const maxStreams = 3;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    currentStreams: {
      type: GraphQLList(GraphQLInt),
      resolve: ({ Item: user }) => user.currentStreams
    },
    canStartNewStream: {
      type: GraphQLBoolean,
      resolve: ({ Item: user }) => user.currentStreams.length < maxStreams
    }
  })
});

module.exports = UserType;