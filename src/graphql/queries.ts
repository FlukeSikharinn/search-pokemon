import { gql } from '@apollo/client';

export const GET_ALL_POKEMON = gql`
  query GetAllPokemon {
    pokemons(first: 151) {
      name
    }
  }
`;

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      types
      maxHP
      maxCP
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
        image
      }
    }
  }
`;
