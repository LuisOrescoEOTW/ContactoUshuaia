import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { deleteContratistas, getContratistas } from "../../redux/slices/contratistas/contratistasThunks";
import { DataGrid, type GridColDef, type GridRowSelectionModel } from "@mui/x-data-grid";
import { Fab, Paper, Tooltip } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import type { Icontratista } from "../models/Icontratista";
import { toast } from "react-toastify";
import AlertDialogEliminar from "../hooks/AlertDialogEliminar";
import { ContratistasForm } from "../components/ContratistasForm";

interface Props {
  contratista: (value: Icontratista | null) => void;
}
export const Contratistas : React.FC<Props> = ({ contratista }) => {

  // Leer
  const dispatch = useDispatch<AppDispatch>();
  const { contratistas = [] } = useSelector((state: RootState) => state.contratistas);

  // General
  useEffect(() => {
    dispatch(getContratistas());
  }, [dispatch]);

  //
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", flex: 0.2 },
    { field: "nombreApellido", headerName: "Nombre y Apellido", flex: 1 },
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

  // Paso el objeto seleccionado de newSelectionModel
  const handleRowSelection = (newSelectionModel: GridRowSelectionModel) => {
    if (
      newSelectionModel &&
      typeof newSelectionModel === "object" &&
      "ids" in newSelectionModel
    ) {
      const modelo = Array.from(newSelectionModel.ids)[0];
      const id = modelo !== undefined ? Number(modelo) : null;
      const selectedContratista = contratistas.find((c) => c.id === id) || null;
      contratista(selectedContratista);
    }
  };

  // Agregar - Modificar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<Icontratista | null>(null);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deleteContratistas(deleteId))
        .then(() => toast.error("Elemento eliminado"))
        .catch(() => toast.error("Error al eliminar el elemento"));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <>
      {/* Contratistas */}
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
          <h2>Contratistas</h2>
          <div style={{ textAlign: "end" }}>
            <Tooltip title="Agregar">
              <Fab
                color="success"
                size="small"
                onClick={(e) => {
                  (e.currentTarget as HTMLButtonElement).blur();
                  setEditState(null);
                  setModalAbrir(true);
                }}
              >
                <Add />
              </Fab>
            </Tooltip>
          </div>
        </div>

        <Paper >
          <DataGrid
            rows={contratistas}
            columns={columns}
            initialState={{
              pagination: { paginationModel: paginationModels },
            }}
            pageSizeOptions={[5, 10, 50, 100]}
            onRowSelectionModelChange={handleRowSelection}
            checkboxSelection={false}
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
      <ContratistasForm
        open={modalAbrir}
        onClose={() => (setModalAbrir(false), setEditState(null))}
        editState={editState}
      />
      {/* Modal Eliminar */}
      <AlertDialogEliminar open={openDialog} onClose={handleDialogClose} />
    </>
  );
};
