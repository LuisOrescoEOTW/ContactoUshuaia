import type { Icontratista } from "./Icontratista";
import type { Irubros } from "./Irubros";

export interface IrubroXContratista {
  id: number; 
  rubrosId: Irubros;
  contratistasId: Icontratista;
  cantidadPuntuados: number; 
  sumatoriaPuntuados: number; 
  habilitado: boolean; 
  deleted: boolean
}