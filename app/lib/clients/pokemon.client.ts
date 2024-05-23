import { ENDPOINTS } from "../constants";
import type {
  Pokemon,
  PokemonType,
  PokemonTypeDetail,
  ResponseData,
} from "../definitions";
import { BaseClient } from "./base";

export class PokemonClient extends BaseClient {
  public async listPokemons(
    offset?: number,
    limit?: number
  ): Promise<ResponseData<Pokemon>> {
    return this.getListResource(ENDPOINTS.POKEMON, offset, limit);
  }

  public async listTypes(
    offset?: number,
    limit?: number
  ): Promise<ResponseData<PokemonType>> {
    return this.getListResource(ENDPOINTS.TYPE, offset, limit);
  }

  public async getPokemonsByType(
    typeId: number | string
  ): Promise<PokemonTypeDetail> {
    return this.getResource(ENDPOINTS.TYPE, typeId);
  }
}
