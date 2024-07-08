import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import { usePokemonStore } from '../store/pokemonStore';
import PokemonList from '../components/PokemonList';
import PokemonDetails from '../components/PokemonDetails';
import Pagination from '../components/Pagination';

const Home = () => {
  const { pokemonList, fetchPokemon } = usePokemonStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredPokemon = pokemonList.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPokemon = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
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
        <PokemonList pokemonList={currentPokemon} />
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </Layout>
  );
};

export default Home;
