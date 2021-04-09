const graphql = require('graphql');

// Imports
const User = require('../User/UserSchema')

const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

// Users
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        role: { type: GraphQLString },
        group: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({group: parent.group})
            }
        }
    })
});

// Main query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {

        // All users
        Users: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                // Code to get data from db / sausage
                // Args = pole args z góry
                // Parent = obiekt "z góry" = przykład book wyżej
                // return _.find(books, { id: args.id });
                return User.find()
            }
        },
    }
});


// Exportuj schemat, w jakim ma wybierać dane
module.exports = new GraphQLSchema({
    query: RootQuery
});
