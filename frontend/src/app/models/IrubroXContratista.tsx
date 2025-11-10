import type { Icontratista } from "./Icontratista";
import type { Irubros } from "./Irubros";

export interface IrubroXContratista {
  id?: number | 0; 
  rubrosId?: number | 0;
  rubros?: Irubros | null;
  contratistasId?: number | 0;
  contratistas?: Icontratista | null;
  cantidadPuntuados: number;
  sumatoriaPuntuados: number; 
  habilitado?: boolean | true; 
  deleted?: boolean | false
}