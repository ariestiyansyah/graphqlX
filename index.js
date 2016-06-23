// Import Library
var graphql = require('graphql');
var graphqlHTTP = require('express-graphql');
var express = require('express');

// Import data from data.json

var data = require('./data.json');

var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
        address: { type: graphql.GraphQLString },
        email: { type: graphql.GraphQLString },
    }
});

// Define the schema
var schema = new graphql.GraphQLSchema({
    query: new graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                type: userType,
                args: {
                    id: { type: graphql.GraphQLString}
                },
                resolve: function (_, args) {
                    return data[args.id];
                }
            }
        }
    })
});

express()
.use('/graphql', graphqlHTTP({ schema: schema, pretty: true}))
.listen(3000);

console.log('GraphQL Server running on localhost:3000/graphql');
