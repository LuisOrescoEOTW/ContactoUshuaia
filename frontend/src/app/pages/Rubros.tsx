import { useDispatch, useSelector } from "react-redux";
import type { Icontratista } from "../models/Icontratista";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { deleteRubros } from "../../redux/slices/rubros/rubrosThunks";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Fab, Paper, Tooltip } from "@mui/material";
import { Add, ArrowBack, Delete, Edit } from "@mui/icons-material";
import type { Irubros } from "../models/Irubros";
import { RubrosForm } from "../components/RubrosForm";
import AlertDialogEliminar from "../hooks/AlertDialogEliminar";
import {
  getRubroXContratistasByRubroId,
  postRubrosXContratistas,
} from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";
import { toast } from "react-toastify";
import AlertDialogAgregar from "../hooks/AlertDialogAgregar";

interface Props {
  contratista: Icontratista | null;
}

export const Rubros: React.FC<Props> = ({ contratista }) => {
  // Leer
  const dispatch = useDispatch<AppDispatch>();
  const { rubros = [] } = useSelector((state: RootState) => state.rubros);
  const { rubrosXContratistas = [] } = useSelector(
    (state: RootState) => state.rubrosXContratistas
  );

  // Acciones
  const columns: GridColDef[] = [
    // { field: "id", headerName: "Id", flex: 0.2 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
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
          <Tooltip title="Asignar">
            <Fab
              size="small"
              color="warning"
              onClick={(e) => {
                (e.currentTarget as HTMLButtonElement).blur();
                setEditState(params.row);
                asignar(params.row.id);
              }}
            >
              <ArrowBack fontSize="small" />
            </Fab>
          </Tooltip>
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
                verificarUso(params.row.id);
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

  // Asignar
  const asignar = (rubroId: number) => {
    if (contratista) {
      const yaAsignado = rubrosXContratistas.some(
        (rxC) =>
          rxC.contratistasId === contratista.id && rxC.rubrosId === rubroId
      );
      if (yaAsignado) {
        toast.error("El rubro ya está asignado a este contratista.");
      } else {
        setOpenDialogAsignar(true);
      }
    } else {
      toast.error("No hay contratista seleccionado para asignar el rubro.");
    }
  };
  const [openDialogAsignar, setOpenDialogAsignar] = useState(false);

  const handleDialogCloseAsignar = async (confirmarAsignar: boolean) => {
    if (contratista && confirmarAsignar && editState) {
      const nuevoRubroXContratista = {
        rubrosId: editState.id,
        contratistasId: contratista.id,
        cantidadPuntuados: 0,
        sumatoriaPuntuados: 0,
        habilitado: true,
      };
      dispatch(postRubrosXContratistas(nuevoRubroXContratista, contratista.id))
        .then(() => {
          toast.success("Rubro asignado al contratista exitosamente.");
        })
        .catch(() => {
          toast.error("Error al asignar el rubro al contratista.");
        });
    }
    setOpenDialogAsignar(false);
  };

  // Agregar - Modificar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<Irubros | null>(null);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const { rubrosXContratistasByRubroId = [] } = useSelector(
    (state: RootState) => state.rubrosXContratistas
  );

  const verificarUso = async (id: number) => {
    await dispatch(getRubroXContratistasByRubroId(id));
  };
  useEffect(() => {
    if (deleteId === null) return;
    if (rubrosXContratistasByRubroId.length > 0) {
      toast.error(
        "No se puede eliminar el rubro porque está asignado a contratistas."
      );
    } else {
      setOpenDialog(true);
    }
  }, [rubrosXContratistasByRubroId]);

  const handleDialogClose = async (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deleteRubros(deleteId, contratista?.id ? contratista.id : 0))
        .then(() => toast.error("Elemento eliminado"))
        .catch(() => toast.error("Error al eliminar el elemento"));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <>
      {/* Rubros */}
      {rubros && (
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
              <h2>Rubros</h2>
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
                rows={rubros}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: paginationModels },
                }}
                pageSizeOptions={[5, 10, 50, 100]}
                // onRowSelectionModelChange={handleRowSelection}
                checkboxSelection={false}
                disableRowSelectionOnClick
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
          <RubrosForm
            open={modalAbrir}
            onClose={() => (setModalAbrir(false), setEditState(null))}
            editState={editState}
            contratista={contratista}
          />
          {/* Modal Eliminar */}
          <AlertDialogEliminar open={openDialog} onClose={handleDialogClose} />

          {/* Modal Agregar */}
          <AlertDialogAgregar
            open={openDialogAsignar}
            onClose={handleDialogCloseAsignar}
          />
        </>
      )}
    </>
  );
};
