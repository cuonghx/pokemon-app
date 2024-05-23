import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pokemon, ResponseData } from "../lib/definitions";
import { getAvatarUrl } from "../lib/utils";

export default async function GridTable({
  pokemons,
}: {
  pokemons: ResponseData<Pokemon>;
}) {
  const resultContent =
    pokemons.count === 0
      ? "No results found."
      : ` (found ${pokemons.count} results)`;
  return (
    <>
      <p className="flex w-full justify-center p-4 text-center">
        {resultContent}
      </p>
      <ScrollArea className="h-[450px] w-full rounded-md border p-4">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {pokemons.results.map((item, idx) => {
            const urlSplitArr = item?.url?.split("/") || "";
            return (
              <div className="flex flex-col items-center" key={item.name + idx}>
                <Image
                  src={getAvatarUrl(urlSplitArr[urlSplitArr.length - 2])}
                  className="rounded-full"
                  alt={`${item.name}'s pokemon avatar`}
                  width={100}
                  height={100}
                />
                <div>
                  <p>{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}
