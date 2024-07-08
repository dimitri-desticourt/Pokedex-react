import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { usePokemonStore } from '../store/pokemonStore';
import PokemonList from '../components/PokemonList';

const Home = () => {
  const { pokemonList, fetchPokemon } = usePokemonStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center my-8">Pokedex</h1>
        <div className="my-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Rechercher un Pokémon par son nom"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <PokemonList pokemonList={searchTerm.trim() === '' ? pokemonList : filteredPokemon} />
      </div>
    </Layout>
  );
};

export default Home;
