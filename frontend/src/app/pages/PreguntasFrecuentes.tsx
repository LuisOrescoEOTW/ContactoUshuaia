import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import { deletePreguntas } from "../../redux/slices/preguntasFrecuentes/preguntasFrecuentesThunks";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Fab, Paper, Tooltip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import type { IpreguntasFrecuentes } from "../models/IpreguntasFrecuentes";
import { toast } from "react-toastify";
import { PreguntasFrecuentesForm } from "../components/PreguntasFrecuentesForm";
import AlertDialogEliminar from "../hooks/AlertDialogEliminar";

export const PreguntasFrecuentes = () => {
  // Leer
  const dispatch = useDispatch<AppDispatch>();
  const { preguntas = [] } = useSelector(
    (state: RootState) => state.preguntasFrecuentes
  );

  // Acciones
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", flex: 0.2 },
    { field: "pregunta", headerName: "Pregunta", flex: 1 },
    { field: "respuesta", headerName: "Respuesta", flex: 1 },

    {
      field: "acciones",
      headerName: "Acciones",
      flex: 0.6,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Tooltip title="Editar">
            <Fab
              size="small"
              color="primary"
              onClick={(e) => {
                (e.currentTarget as HTMLButtonElement).blur();
                setEditState(params.row);
                setModalAbrir(true);
              }}
            >
              <Edit fontSize="small" />
            </Fab>
          </Tooltip>
          <Tooltip title="Eliminar">
            <Fab
              size="small"
              color="error"
              onClick={(e) => {
                (e.currentTarget as HTMLButtonElement).blur();
                setDeleteId(params.row.id);
                setOpenDialog(true);
              }}
            >
              <Delete fontSize="small" />
            </Fab>
          </Tooltip>
        </div>
      ),
    },
  ];
  const paginationModels = { page: 0, pageSize: 5 };

  // Agregar - Modificar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<IpreguntasFrecuentes | null>(null);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deletePreguntas(deleteId))
        .then(() => toast.error("Elemento eliminado"))
        .catch(() => toast.error("Error al eliminar el elemento"));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <>
      {/* Preguntas Frecuentes */}
      {preguntas && (
        <>
          <div style={{ margin: "5px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#008F9E",
                marginBottom: "1%",
                paddingLeft: "3%",
                paddingRight: "3%",
                borderRadius: "20px",
                color: "white",
              }}
            >
              <h2>Preguntas Frecuentes</h2>
              <div style={{ textAlign: "end" }}>
                <Tooltip title="Agregar">
                  <Fab
                    color="success"
                    size="small"
                    onClick={(e) => {
                      (e.currentTarget as HTMLButtonElement).blur(); // 👈 quita el foco
                      setEditState(null);
                      setModalAbrir(true);
                    }}
                  >
                    <Add />
                  </Fab>
                </Tooltip>
              </div>
            </div>

            {/* <Paper sx={{ width: "100%", height: "100%" }}> */}
            <Paper>
              <DataGrid
                rows={preguntas}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: paginationModels },
                }}
                pageSizeOptions={[5, 10, 50, 100]}
                checkboxSelection={false}
                rowSelection={false}
                sx={{
                  width: "100%",
                  height: "100%",
                  border: 2,
                  borderColor: "#D9D9D9",
                  "& .MuiDataGrid-virtualScroller": { overflow: "auto" },
                }}
              />
            </Paper>
          </div>

          {/* Alta - Modificaciones */}
          <PreguntasFrecuentesForm
            open={modalAbrir}
            onClose={() => (setModalAbrir(false), setEditState(null))}
            editState={editState}
          />

          {/* Modal Eliminar */}
          <AlertDialogEliminar open={openDialog} onClose={handleDialogClose} />
        </>
      )}
    </>
  );
};
