import { gql } from 'apollo-server-express';

export const PokemonSchema = gql`
  # Represents a Pokémon's attack types
  type Attack {
    # The name of this Pokémon attack
    name: String

    # The type of this Pokémon attack
    type: String

    # The damage of this Pokémon attack
    damage: Int
  }

  type Image {
    JPG: String
    PNG: String
  }

  # Represents a Pokémon
  type Pokemon {
    # The ID of an object
    id: ID!

    # The identifier of this Pokémon
    number: String

    # The name of this Pokémon
    name: String

    # The minimum and maximum weight of this Pokémon
    weight: PokemonDimension

    # The minimum and maximum weight of this Pokémon
    height: PokemonDimension

    # The classification of this Pokémon
    classification: String

    # The type(s) of this Pokémon
    types: [String]

    # The type(s) of Pokémons that this Pokémon is resistant to
    resistant: [String]

    # The attacks of this Pokémon
    attacks: PokemonAttack

    # The type(s) of Pokémons that this Pokémon weak to
    weaknesses: [String]
    fleeRate: Float

    # The maximum CP of this Pokémon
    maxCP: Int

    # The evolutions of this Pokémon
    evolutions: [Pokemon]

    # The evolution requirements of this Pokémon
    evolutionRequirements: PokemonEvolutionRequirement

    # The maximum HP of this Pokémon
    maxHP: Int

    # The pokemon image
    image: Image
  }

  # Represents a Pokémon's attack types
  type PokemonAttack {
    # The fast attacks of this Pokémon
    fast: [Attack]

    # The special attacks of this Pokémon
    special: [Attack]
  }

  # Represents a Pokémon's dimensions
  type PokemonDimension {
    # The minimum value of this dimension
    minimum: String

    # The maximum value of this dimension
    maximum: String
  }

  # Represents a Pokémon's requirement to evolve
  type PokemonEvolutionRequirement {
    # The amount of candy to evolve
    amount: Int

    # The name of the candy to evolve
    name: String
  }

  input PokemonFilter {
    name: String
    type: String
  }

  type PokemonQuery {
    edges: [Pokemon]
    totalCount: Int
  }

  type Query {
    pokemons(first: Int, offset: Int): PokemonQuery
    pokemon(name: String!): Pokemon
    searchPokemons(first: Int, offset: Int, filters: PokemonFilter!): PokemonQuery
  }
`;
