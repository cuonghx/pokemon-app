import { Suspense } from "react";
import Image from "next/image";
import Paging from "./ui/paging";
import GridTable from "./ui/grid-table";
import Filter from "./ui/filter";
import SkeletonCard from "./ui/skeleton-table";
import {
  fetchPokemonTypes,
  fetchPokemonByTypes,
  ITEMS_PER_PAGE,
} from "./lib/data";

type SeachParams = {
  filter?: string;
  page?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: SeachParams;
}) {
  const filter =
    searchParams && searchParams.filter ? searchParams.filter.split("_") : [];
  const currentPage = Number(searchParams?.page) || 1;
  let pokemonTypes = await fetchPokemonTypes();
  let pokemons = await fetchPokemonByTypes(filter, currentPage);
  let pokemonTotal = pokemons.count;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 font-mono">
      <div className="w-full max-w-5xl items-center justify-center text-sm lg:flex">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png`}
          className="rounded-full"
          alt={`logo`}
          width={200}
          height={200}
        />
      </div>
      <div className="w-full max-w-5xl text-sm ">
        <div className="flex w-full pb-6 pt-8 lg:static lg:w-auto lg:p-4 ">
          <Filter filterList={pokemonTypes} defaultFilter={filter} />
        </div>
      </div>

      <Suspense
        key={filter.join("_") + currentPage}
        fallback={<SkeletonCard />}
      >
        <GridTable pokemons={pokemons} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Paging
          totalPages={
            pokemonTotal % ITEMS_PER_PAGE === 0
              ? pokemonTotal / ITEMS_PER_PAGE
              : Math.floor(pokemonTotal / ITEMS_PER_PAGE) + 1
          }
        />
      </div>
    </main>
  );
}
