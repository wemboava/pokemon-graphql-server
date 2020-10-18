import { ApolloServer } from 'apollo-server';

import * as resolvers from './graphql/resolvers/index';
import * as schemas from './graphql/schemas/index';

console.log(Object.values({ ...resolvers }));

const server = new ApolloServer({
  typeDefs: Object.values(schemas),
  resolvers: Object.values({ ...resolvers }),
});

// eslint-disable-next-line @typescript-eslint/no-floating-promises
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
