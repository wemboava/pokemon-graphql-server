import { ApolloServer } from 'apollo-server-express';
// import cors from 'cors';
import express from 'express';
import { importSchema } from 'graphql-import';

import * as resolvers from './graphql/resolvers/index';
import * as schemas from './graphql/schemas/index';

const server = new ApolloServer({
  typeDefs: importSchema(schemas),
  resolvers,
  introspection: true,
  playground: {
    settings: {
      // So that auth works
      // Docs: https://github.com/prisma/graphql-playground
      ['request.credentials']: 'same-origin',
    },
  },
  subscriptions: { path: '/api' },
});

const app = express();

// app.use(cors(corsOptions));

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
// playground: true,
// cors: true,
// });

// // eslint-disable-next-line @typescript-eslint/no-floating-promises
// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });
