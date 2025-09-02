export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  results: PokemonListResult[];
}

export interface PokemonSprites {
  front_default: string;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: { name: string };
}

export interface Pokemon {
  id: number;
  name: string;
  cries: { latest: string };
  sprites: { front_default: string; back_default: string };
  types: { slot: number; type: { name: string } }[];
  stats: PokemonStat[];
}
