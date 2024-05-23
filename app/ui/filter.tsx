"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PokemonType, ResponseData } from "../lib/definitions";

export interface IFilterProps {
  filterList: PokemonType[];
  defaultFilter: string[];
}

export default function Filter(props: IFilterProps) {
  const { filterList, defaultFilter } = props;
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  function onChangeFilter(pickedItem: string[]) {
    const params = new URLSearchParams(searchParams);
    const filterString = pickedItem.length > 0 ? pickedItem.join("_") : "";
    params.set("page", "1");
    if (pickedItem && pickedItem.length > 0) {
      params.set("filter", filterString);
    } else {
      params.delete("filter");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex">
      <p className="py-2 font-bold text-lg">Types:</p>
      <ToggleGroup
        onValueChange={onChangeFilter}
        variant="outline"
        type="multiple"
        defaultValue={defaultFilter}
        className="flex-wrap"
      >
        {filterList.map(({ name }: PokemonType) => (
          <ToggleGroupItem key={name} value={name}>
            {name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}
