import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { Fab, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import type { Iaviso } from "../models/Iaviso";
import { AvisosForm } from "../components/AvisosForm";

export const Avisos = () => {
  // Leer
  const { avisos = [] } = useSelector((state: RootState) => state.avisos);

  // Modificar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<Iaviso | null>(null);

  return (
    <>
      {/* Avisos */}
      {avisos && (
        <>
          <div style={{ margin: "5px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "GrayText",
                marginBottom: "1%",
                paddingLeft: "3%",
                paddingRight: "3%",
                borderRadius: "20px",
                color: "white",
              }}
            >
              <h2>Avisos al correo: {avisos[0]?.email}</h2>
              <div style={{ textAlign: "end" }}>
                <Tooltip title="Editar">
                  <Fab
                    size="small"
                    color="primary"
                    onClick={(e) => {
                      (e.currentTarget as HTMLButtonElement).blur();
                      setEditState(avisos[0]);
                      setModalAbrir(true);
                    }}
                  >
                    <Edit fontSize="small" />
                  </Fab>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Alta - Modificaciones */}
          <AvisosForm
            open={modalAbrir}
            onClose={() => (setModalAbrir(false), setEditState(null))}
            editState={editState}
          />
        </>
      )}
    </>
  );
};
