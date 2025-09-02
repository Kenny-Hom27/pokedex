import { NO_POKEMON_FOUND, OFFSET } from "../constants";
import type { PokemonListResponse, Pokemon } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemonList(
  offset = 0,
  limit = OFFSET
): Promise<PokemonListResponse> {
  const res = await fetch(
    `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) throw new Error(NO_POKEMON_FOUND);
  return res.json();
}

export async function fetchPokemonById(id: string | number): Promise<Pokemon> {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) throw new Error(NO_POKEMON_FOUND);
  return res.json();
}
