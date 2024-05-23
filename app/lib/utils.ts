import { Pokemon } from "./definitions";

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const getPaginatedResults = (
  inputArr: any[],
  page: number,
  pageSize: number
) => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return inputArr.slice(start, end);
};

export function findCommonElements<T extends Pokemon[]>(arrays: T[]) {
  if (arrays.length === 0) return [];
  const extractNames = (array: any[]) => array.map((item) => item.name);
  let commonNames = new Set(extractNames(arrays[0]));
  for (let i = 1; i < arrays.length; i++) {
    const currentNames = new Set(extractNames(arrays[i]));
    const newCommonNames = new Set<string>();
    commonNames.forEach((name) => {
      if (currentNames.has(name)) {
        newCommonNames.add(name);
      }
    });
    commonNames = newCommonNames;
  }
  const commonPokemon = [];
  const seenNames = new Set(commonNames);
  for (const item of arrays[0]) {
    if (seenNames.has(item.name)) {
      commonPokemon.push(item);
      seenNames.delete(item.name);
    }
  }
  return commonPokemon;
}

export const getAvatarUrl = (pokemonId: string | number) => {
  const baseUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork`;
  return `${baseUrl}/${pokemonId}.png`;
};
