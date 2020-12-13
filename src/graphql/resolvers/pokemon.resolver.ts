import { IResolvers } from 'apollo-server-express';

import pokemons from '../../data/pokemons.json';
import { captalize } from '../utils/functions';

interface PokemonFilter {
  first: number;
  offset: number;
  filters: {
    name: string;
    type: string;
  };
}

export const PokemonResolver: IResolvers = {
  Pokemon: {
    image: ({ name }: { name: string }) => {
      const pokemonName = name
        .toLowerCase()
        .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
        .replace(' ', '-');
      return {
        PNG: `https://img.pokemondb.net/sprites/go/normal/${pokemonName}.png`,
        JPG: `https://img.pokemondb.net/artwork/${pokemonName}.jpg`,
      };
    },
  },
  Query: {
    pokemons: (_root, { first = 0, offset = 1 }) => {
      const pokemonsCopy = [...pokemons];
      const totalCount = pokemons.length;
      return {
        edges: pokemonsCopy.splice(first || totalCount * (offset - 1), first || totalCount),
        totalCount,
      };
    },
    pokemon: (_root, { name }: { name: string }) => {
      const pokemon = pokemons.find((poke) => poke.name.toLowerCase() === name.toLowerCase());
      return pokemon;
    },
    searchPokemons: (_root, { first = 0, offset = 1, filters }: PokemonFilter) => {
      const pokemonsCopy = [...pokemons];
      const pokemonsFiltered = pokemonsCopy.filter(
        (poke) =>
          poke.name.toLowerCase() === filters?.name?.toLowerCase() ||
          poke.types.includes(captalize(filters?.type || '')),
      );
      const totalCount = pokemonsFiltered.length;
      return {
        edges: pokemonsFiltered.splice(first || totalCount * (offset - 1), first || totalCount),
        totalCount,
      };
    },
  },
};
