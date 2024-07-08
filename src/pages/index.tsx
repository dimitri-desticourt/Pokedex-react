import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { usePokemonStore } from '../store/pokemonStore';
import { Pokemon } from '../types';

const Home = () => {
  const { pokemonList, fetchPokemon } = usePokemonStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPokemon([]);
      return;
    }

    const filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
  }, [searchTerm, pokemonList]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(searchTerm.trim() === '' ? pokemonList : filteredPokemon).map((pokemon: Pokemon) => (
            <div key={pokemon.name} className="card p-4 border rounded-lg shadow-md">
              <img src={pokemon.image} alt={pokemon.name} className="mx-auto" />
              <h2 className="text-xl font-bold text-center mt-2">{pokemon.name}</h2>
              <div className="flex justify-center mt-2">
                {pokemon.apiTypes.map((type, index) => (
                  <div key={index} className="flex items-center mr-2">
                    <img src={type.image} alt={type.name} className="w-6 h-6 mr-1" />
                    <span className="text-sm font-semibold">{type.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
