import { Contratistas } from "./Contratistas";
import { PalabrasClaves } from "./PalabrasClaves";
import { useState } from "react";
import { RubrosXContratistas } from "./RubrosXContratistas";
import type { Icontratista } from "../models/Icontratista";
import { Rubros } from "./Rubros";

export const Admin = () => {

  const [contratistaSelect, setContratistaSelect] = useState<Icontratista | null>(null);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          width: "99vw",
        }}
      >
        <Contratistas contratista={setContratistaSelect} />
        <RubrosXContratistas contratista={contratistaSelect}/>
        <Rubros contratista={contratistaSelect} />

        {/*<Rubros onClose={setRubrosSelect} selectedId={rubrosSelect} /> */}
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "99vw",
        }}
      >
        <PalabrasClaves />
      </div>
      {/* Validar Agregar 
      <AlertDialogAgregar open={openDialog} onClose={handleDialogClose} />;
      */}
    </>
  );
};


  // const [rubrosSelect, setRubrosSelect] = useState<number | null>(null);
  // const dispatch = useDispatch<AppDispatch>();

  // Aceptar agregar
  // const [openDialog, setOpenDialog] = useState(false);
  // const handleDialogClose = (confirm: boolean) => {
  //   if (confirm && contratistaSelect !== null && rubrosSelect !== null) {
  //     const newAssociation: IrubroXContratista = {
  //       contratistasId: contratistaSelect,
  //       rubrosId: rubrosSelect,
  //       cantidadPuntuados: 0, 
  //       sumatoriaPuntuados: 0,
  //     };
  //     console.log("Nueva asociación a agregar:", newAssociation);
  //     dispatch(postRubrosXContratistas(newAssociation))
  //       .then(() => toast.success("Elemento agregado"))
  //       .catch(() => toast.error("Error al agregar el elemento"));
  //   }
  //   setRubrosSelect(null);
  //   setOpenDialog(false);
  // };

  // Combinación de selecciones
  // const ambasSelecciones = () => {
  //   if (contratistaSelect !== null && rubrosSelect !== null) {
  //     console.log("Ambas selecciones son válidas");
  //     setOpenDialog(true);
  //     return true;
  //   }
  //   console.log("Falta una selección válida");
  //   return false;
  // };
  // useEffect(() => {
  //   ambasSelecciones();
  // }, [contratistaSelect, rubrosSelect]);