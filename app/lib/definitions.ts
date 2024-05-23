export type PokemonType = {
  name: string;
  id: number;
};

export type Pokemon = {
  name: string;
  url: string;
  id: number;
};

export type PokemonTypeDetail = {
  pokemon: { pokemon: Pokemon }[];
};

export type ResponseData<T> = {
  count: number;
  results: T[];
};
