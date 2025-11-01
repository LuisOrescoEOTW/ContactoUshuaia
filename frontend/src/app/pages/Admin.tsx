import React from "react";
import { Rubros } from "./Rubros";

export const Admin = () => {
  

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        width: "99vw",
        height: "40vh",
      }}
    >
    <Rubros />
    </div>
  );
};
