import { render, screen } from '@testing-library/react';
import PokemonList from '../PokemonList';
import { useRouter } from 'next/navigation';
import { bulbasaur, charmander, squirtle } from "../test/mockPokemons";

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('PokemonList Component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('Test Bulbasaur', async () => {
    render(<PokemonList loading={false} error={null} pokemon={bulbasaur} />);
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Grass')).toBeInTheDocument();
  });

  it('Test Charmander', async () => {
    render(<PokemonList loading={false} error={null} pokemon={charmander} />);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Fire')).toBeInTheDocument();
  });

  it('Test Squirtle', async () => {
    render(<PokemonList loading={false} error={null} pokemon={squirtle} />);
    expect(screen.getByText('Squirtle')).toBeInTheDocument();
    expect(screen.getByText('Water')).toBeInTheDocument();
  });
});
