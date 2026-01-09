import type { IrubroXContratista } from "./IrubroXContratista";

export interface Ipuntuar {
  id: number;
  usuario: string;
  puntaje: number;
  rubrosXcontratistasId?: number;
  rubrosXcontratistas?: IrubroXContratista | null;
  deleted: boolean;
}