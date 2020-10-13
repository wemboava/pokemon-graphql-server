import { gql } from 'apollo-server';

export const TypeSchema = gql`
  type Type {
    id: ID
    name: String
    color: String
  }
  extend type Query {
    types: [Type]
    type(name: String!): Type
  }
`;
