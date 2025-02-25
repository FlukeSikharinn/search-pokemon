import { GET_POKEMON } from "@/graphql/queries";
import { createApolloClient } from "@/apollo/apolloClient";
import { Pokemon } from "@/types/pokemon";
import PokemonList from "@/components/PokemonList";
import Search from "@/components/Search";

interface PokemonPageProps {
  params: {
    name: string;
  };
}

const PokemonPage: React.FC<PokemonPageProps> = async ({ params }) => {
  const client = createApolloClient();
  let pokemon: Pokemon | undefined = undefined;
  let error: Error | undefined = undefined;

  try {
    const { data } = await client.query<{ pokemon: Pokemon }>({
      query: GET_POKEMON,
      variables: { name: params.name },
    });

    pokemon = data.pokemon;
  } catch (err) {
    error = err instanceof Error ? err : new Error("Failed to fetch Pokémon");
  }

  return (
    <div className="p-4">
      <Search />
      <PokemonList error={error || undefined} pokemon={pokemon} />
    </div>
  );
};

export default PokemonPage;
