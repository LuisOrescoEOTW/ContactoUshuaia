import type { Irubros } from "./Irubros";

export interface IpalabrasClaves {
  id: number; 
  nombre: string; 
  rubrosId: number;
  rubros?: Irubros | null;
  deleted: boolean;
}