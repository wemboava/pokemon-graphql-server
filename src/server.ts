/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
import cors from 'cors';

import * as resolvers from './graphql/resolvers/index';
import * as schemas from './graphql/schemas/index';

const { ApolloServer } = require('apollo-server-express');
const express = require('express');

const server = new ApolloServer({
  typeDefs: Object.values(schemas),
  resolvers: Object.values({ ...resolvers }),
});

const app = express();

app.use(cors());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`),
);

// import { ApolloServer } from 'apollo-server';

// import * as resolvers from './graphql/resolvers/index';
// import * as schemas from './graphql/schemas/index';

// console.log(Object.values({ ...resolvers }));

// const server = new ApolloServer({
//   typeDefs: Object.values(schemas),
//   resolvers: Object.values({ ...resolvers }),
// });

// // eslint-disable-next-line @typescript-eslint/no-floating-promises
// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
