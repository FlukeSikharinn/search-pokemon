import { GET_POKEMON, GET_ALL_POKEMON } from "@/graphql/queries";
import { createApolloClient } from "@/apollo/apolloClient";
import { Pokemon } from "@/types/pokemon";
import PokemonList from "@/components/PokemonList";
import Search from "@/components/Search";

interface PokemonPageProps {
  params: Promise<{ name: string }>;
}

async function getPokemon(name: string): Promise<{ pokemon?: Pokemon; error?: Error }> {
  const client = createApolloClient();
  try {
    const { data } = await client.query<{ pokemon: Pokemon }>({
      query: GET_POKEMON,
      variables: { name },
      fetchPolicy: "network-only"
    });
    return { pokemon: data.pokemon };
  } catch {
    return { error: new Error("Failed to fetch Pokemon") };
  }
}

async function getAllPokemons(): Promise<Pokemon[]> {
  const client = createApolloClient();
  try {
    const { data } = await client.query<{ pokemons: Pokemon[] }>({
      query: GET_ALL_POKEMON,
    });
    // console.log(data)
    return data.pokemons;
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const pokemons = await getAllPokemons();
    if (!pokemons || pokemons.length === 0) {
      console.error("No Pokemon data found.");
      return [];
    }
    // console.log(pokemons.map((pokemon) => ({ name: pokemon.name })))
    return pokemons.map((pokemon) => ({ name: pokemon.name }));
  } catch (error) {
    console.error("Error fetching pokemons:", error);
    return [];
  }
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const { name } = await params;
  const { pokemon, error } = await getPokemon(name);

  return (
    <div className="p-4">
      <Search />
      <PokemonList error={error} pokemon={pokemon} />
    </div>
  );
}
