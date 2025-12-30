import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { useState } from "react";
import { deletePalabrasClaves } from "../../redux/slices/palabrasClaves/palabrasClavesThunks";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Fab, Paper, Tooltip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import type { IpalabrasClaves } from "../models/IpalabrasClaves";
import { toast } from "react-toastify";
import { PalabrasClavesForm } from "../components/PalabrasClavesForm";
import AlertDialogEliminar from "../hooks/AlertDialogEliminar";

export const PalabrasClaves = () => {
  // Leer
  const dispatch = useDispatch<AppDispatch>();
  const { palabrasClaves = [] } = useSelector(
    (state: RootState) => state.palabrasClaves
  );

  // Acciones
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", flex: 0.2 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    {
      field: "rubros",
      headerName: "Rubro",
      flex: 1,
      renderCell: (params) => <>{params.row?.rubros?.nombre ?? "Sin rubro"}</>,
    },
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
  const [editState, setEditState] = useState<IpalabrasClaves | null>(null);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deletePalabrasClaves(deleteId))
        .then(() => toast.error("Elemento eliminado"))
        .catch(() => toast.error("Error al eliminar el elemento"));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <>
      {/* Palabras Claves */}
      {palabrasClaves && (
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
              <h2>Palabras Claves</h2>
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

            <Paper>
              <DataGrid
                rows={palabrasClaves}
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
          <PalabrasClavesForm
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
