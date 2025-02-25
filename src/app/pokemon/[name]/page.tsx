import { GET_POKEMON } from "@/graphql/queries";
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
    });
    return { pokemon: data.pokemon };
  } catch (error) {
    return { error: error instanceof Error ? error : new Error("Failed to fetch Pokémon") };
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
