import { GET_POKEMON } from "@/graphql/queries";
import { createApolloClient } from "@/apollo/apolloClient";
import { Pokemon } from "@/types/pokemon";
import PokemonList from "@/components/PokemonList";
import Search from "@/components/Search";

interface PokemonPageProps {
  pokemon: Pokemon;
  error: string | null;
}

export async function generateStaticParams() {
  // Return static params to generate paths ahead of time
  // You can fetch the available pokemon names and return as a list of params
  return [
    { name: "bulbasaur" },
    { name: "charmander" },
    { name: "squirtle" },
    // Add more Pokémon names dynamically here if needed
  ];
}

export async function generateMetadata({ params }: { params: { name: string } }) {
  const client = createApolloClient();
  let pokemon: Pokemon | null = null;
  let error: string | null = null;

  try {
    const { data } = await client.query<{ pokemon: Pokemon }>({
      query: GET_POKEMON,
      variables: { name: params.name },
    });
    pokemon = data.pokemon;
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch Pokémon";
  }

  return {
    title: pokemon ? pokemon.name : "Pokémon not found",
    description: error || "Details of the selected Pokémon",
  };
}

const PokemonPage: React.FC<PokemonPageProps> = ({ pokemon, error }) => {
  return (
    <div className="p-4">
      <Search />
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <PokemonList pokemon={pokemon} />
      )}
    </div>
  );
};

export default PokemonPage;
