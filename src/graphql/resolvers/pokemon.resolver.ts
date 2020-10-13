import { IResolvers } from 'apollo-server';

import pokemons from '../../data/pokemons.json';
import { captalize } from '../utils/functions';

interface PokemonFilter {
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
    pokemons: () => pokemons,
    pokemon: (_root, { name }: { name: string }) => {
      const pokemon = pokemons.find((poke) => poke.name.toLowerCase() === name.toLowerCase());
      return pokemon;
    },
    searchPokemons: (_root, { filters }: PokemonFilter) => {
      const pokemonsFiltered = pokemons.filter(
        (poke) =>
          poke.name.toLowerCase() === filters?.name?.toLowerCase() ||
          poke.types.includes(captalize(filters?.type || '')),
      );
      return pokemonsFiltered;
    },
  },
};
