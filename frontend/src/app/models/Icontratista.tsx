export interface Icontratista {
  id: number; 
  nombreApellido: string;
  telefono: string;
  email: string | null;
  matricula: string | null;
  facebook: string | null;
  instagram: string | null;
  comentario: string | null;
  deleted: boolean
}