import React from 'react';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../types';

interface Props {
  pokemonList: Pokemon[];
}

const PokemonList: React.FC<Props> = ({ pokemonList }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
