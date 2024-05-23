import { PokemonClient } from "./clients";
import { Pokemon, PokemonType, ResponseData } from "./definitions";
import { InMemoryCache } from "./in-memory-cache";
import { findCommonElements, getPaginatedResults } from "./utils";

export const ITEMS_PER_PAGE = 60;

const clientApi = new PokemonClient({ logs: true });
const pokemonCached = new InMemoryCache<Pokemon>(100, 60000); // Max 100 entries, 1-minutes TTL

async function fetchPokemonList(
  currentPage: number
): Promise<ResponseData<Pokemon>> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const response = await clientApi.listPokemons(offset, ITEMS_PER_PAGE);
  return response;
}

export const fetchPokemonTypes = async (): Promise<PokemonType[]> => {
  try {
    const response = await clientApi.listTypes(0, ITEMS_PER_PAGE);
    return response.results;
  } catch (error) {
    throw new Error("Failed to fetch pokemon's type.");
  }
};

export async function fetchPokemonByTypeWithCache(typeId: string) {
  const cachedData = pokemonCached.get(typeId);
  if (cachedData) {
    return cachedData;
  }
  const response = await clientApi.getPokemonsByType(typeId);
  const transformedData = response.pokemon.map((item: any) => item.pokemon);
  pokemonCached.set(typeId, transformedData);
  return transformedData;
}

export async function fetchPokemonByTypes(
  typeIds: string[] = [],
  currentPage: number
): Promise<ResponseData<Pokemon>> {
  const cachedKey = typeIds.sort().join("_");
  const cachedData = pokemonCached.get(cachedKey);
  if (cachedData) {
    const data = cachedData;
    return {
      count: data.length,
      results: getPaginatedResults(cachedData, currentPage, ITEMS_PER_PAGE),
    };
  }

  try {
    if (typeIds.length === 0) {
      const response = await fetchPokemonList(currentPage);
      return response;
    }
    const allPokemonPromises = typeIds.map((typeId) =>
      fetchPokemonByTypeWithCache(typeId)
    );
    const allPokemonArrays = (await Promise.all(allPokemonPromises)) as any[];
    const result = findCommonElements(allPokemonArrays);

    pokemonCached.set(cachedKey, result);
    return {
      count: result.length,
      results: getPaginatedResults(result, currentPage, ITEMS_PER_PAGE),
    };
  } catch (error) {
    throw new Error("Failed to fetch pokemons.");
  }
}
