import { IResolvers } from 'apollo-server-express';

import types from '../../data/types.json';

export const TypeResolver: IResolvers = {
  Query: {
    types: () => types,
    type: (_root, { name }: { name: string }) => {
      const type = types.find((type) => type.name === name.toLowerCase());
      return type;
    },
  },
};
