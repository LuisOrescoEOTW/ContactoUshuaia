import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Fab, Paper, Tooltip } from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useState } from "react";
import { deletePuntajesFisico } from "../../redux/slices/Puntuar/puntuarThunks";
import { toast } from "react-toastify";
import type { Ipuntuar } from "../models/Ipuntuar";
import AlertDialogAgregar from "../hooks/AlertDialogAgregar";
import AlertDialogEliminar from "../hooks/AlertDialogEliminar";
import { putRubrosXContratistasSinRefresh } from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";

export const Puntuar = () => {
  // Leer
  const dispatch = useDispatch<AppDispatch>();
  const { puntajes = [] } = useSelector((state: RootState) => state.puntuar);

  // Acciones
  const columns: GridColDef[] = [
    {
      field: "rubrosXcontratistas.rubros",
      headerName: "Rubro",
      flex: 0.8,
      renderCell: (params) => (
        <>{params.row?.rubrosXcontratistas?.rubros?.nombre ?? "Sin rubro"}</>
      ),
    },
    {
      field: "rubrosXcontratistas.contratistas",
      headerName: "Contratista",
      flex: 1,
      renderCell: (params) => (
        <>
          {params.row?.rubrosXcontratistas?.contratistas?.nombreApellido ??
            "Sin contratista"}
        </>
      ),
    },
    { field: "usuario", headerName: "Usuario", flex: 1 },
    { field: "puntaje", headerName: "Puntaje", flex: 0.5 },

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
            gap: "9px",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Tooltip title="Aprobar">
            <Fab
              size="small"
              color="success"
              onClick={(e) => {
                (e.currentTarget as HTMLButtonElement).blur();
                setDeleteId(params.row.id);
                setEditState(params.row);
                setOpenDialogAprobar(true);
              }}
            >
              <CheckCircle fontSize="small" />
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
              <Cancel fontSize="small" />
            </Fab>
          </Tooltip>
        </div>
      ),
    },
  ];
  const paginationModels = { page: 0, pageSize: 5 };

  // Agregar - Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [editState, setEditState] = useState<Ipuntuar | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAprobar, setOpenDialogAprobar] = useState(false);

  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(deletePuntajesFisico(deleteId))
        .then(() => toast.error("Elemento eliminado"))
        .catch(() => toast.error("Error al eliminar el elemento"));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  const handleDialogCloseAprobar = (confirm: boolean) => {
    if (confirm && deleteId !== null && editState !== null) {
        const objetoRubroXContratista = {
          id: editState.rubrosXcontratistasId,
          rubrosId: editState.rubrosXcontratistas?.rubrosId,
          contratistasId: editState.rubrosXcontratistas?.contratistasId,
          cantidadPuntuados:
            (editState.rubrosXcontratistas?.cantidadPuntuados ?? 0) + 1,
          sumatoriaPuntuados:
            (editState.rubrosXcontratistas?.sumatoriaPuntuados ?? 0) +
            editState.puntaje,
          habilitado: editState.rubrosXcontratistas?.habilitado,
          deleted: editState.rubrosXcontratistas?.deleted,
        };
        // Modificar la tabla rubrosXcontratistas
        dispatch(putRubrosXContratistasSinRefresh(objetoRubroXContratista))
          .then(() => {
            toast.success("Puntaje aprobado y actualizado");
            // Eliminar el puntaje aprobado
            dispatch(deletePuntajesFisico(deleteId))
              .then(() => toast.info("Eliminado después de aprobar"))
              .catch(() => toast.error("Error al eliminar el puntaje aprobado"));
          })
          .catch(() => toast.error("Error al actualizar rubroXcontratista"));
    }
    setDeleteId(null);
    setOpenDialogAprobar(false);
  };

  return (
    <>
      {/* Puntuar */}
      {puntajes && (
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
              <h2>Puntuar</h2>
            </div>

            {/* <Paper sx={{ width: "100%", height: "100%" }}> */}
            <Paper>
              <DataGrid
                rows={puntajes}
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

          {/* Aprobar */}
          <AlertDialogAgregar
            open={openDialogAprobar}
            onClose={handleDialogCloseAprobar}
          />

          {/* Modal Eliminar */}
          <AlertDialogEliminar open={openDialog} onClose={handleDialogClose} />
        </>
      )}
    </>
  );
};
