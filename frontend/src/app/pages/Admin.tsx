import { Rubros } from "./Rubros";
import { Contratistas } from "./Contratistas";
import { PalabrasClaves } from "./PalabrasClaves";
import { useEffect, useState } from "react";

export const Admin = () => {
  const [contratistaSelect, setContratistaSelect] = useState<number | null>(null);
  const [rubrosSelect, setRubrosSelect] = useState<number | null>(null);

  useEffect(() => {
    console.log("Contratista seleccionado:", contratistaSelect);
  }, [contratistaSelect]);

  useEffect(() => {
    console.log("Rubro seleccionado:", rubrosSelect);
  }, [rubrosSelect]);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          width: "99vw",
          // height: "47vh",
        }}
      >
        <Contratistas onClose={setContratistaSelect} />
        <Rubros onClose={setRubrosSelect} />
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "99vw",
          // height: "40vh",
        }}
      >
        <PalabrasClaves />
      </div>
    </>
  );
};
