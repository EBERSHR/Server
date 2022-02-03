import { gql } from "apollo-server-express";

const typeDefs = gql`

    type Test {
        test: String!
    }

    type User {
        id: String!
        user: String
        email: String
    }

    type Query {
        test: Test
        users: [User]
        findPersonId(id: String!): User
    }

    type Mutation {
        addUser(
            user: String
            email: String
        ) : User
    }

`
module.exports = typeDefs