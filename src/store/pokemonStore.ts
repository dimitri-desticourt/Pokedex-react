import create from 'zustand';
import { Pokemon } from '../types';

interface PokemonStore {
  pokemonList: Pokemon[];
  fetchPokemon: () => Promise<void>;
}

const usePokemonStore = create<PokemonStore>((set) => ({
  pokemonList: [],
  fetchPokemon: async () => {
    try {
      const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon');
      }
      const data: Pokemon[] = await response.json();
      set({ pokemonList: data });
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  },
}));

export { usePokemonStore };
