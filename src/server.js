import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const app = express();

app.use(cors());

let apolloServer = null;

const startServer = async () => {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
};

startServer();

app.get('/', (req, res) => {
    res.json({ data: "Apollo Server GraphQL - serving for you..." });
});

const port = process.env.PORT || 9000;

app.listen(port, ()=>{
    // console.log(`server running on port 4000`);
    // console.log(`gql path is ${apolloServer.graphqlPath}`);
});
