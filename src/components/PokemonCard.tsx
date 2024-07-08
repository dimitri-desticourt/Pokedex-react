import React from 'react';
import { Pokemon } from '../types';

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <div className="card p-4 border rounded-lg shadow-md">
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
  );
};

export default PokemonCard;
