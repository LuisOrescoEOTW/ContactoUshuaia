import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import {
  deleteRubrosXContratistas,
  getRubroXContratistasById,
  putRubrosXContratistas,
} from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Fab, Paper, Switch, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import type { IrubroXContratista } from "../models/IrubroXContratista";
import { toast } from "react-toastify";
import AlertDialogEliminar from "../hooks/AlertDialogEliminar";
import type { Icontratista } from "../models/Icontratista";
import { RubrosXContratistasForm } from "../components/RubrosXContratistasForm";
import AlertDialogEditar from "../hooks/AlertDialogEditar";

interface Props {
  contratista: Icontratista | null;
}

export const RubrosXContratistas: React.FC<Props> = ({ contratista }) => {
  // Leer
  const dispatch = useDispatch<AppDispatch>();
  const { rubrosXContratistas = [] } = useSelector(
    (state: RootState) => state.rubrosXContratistas
  );

  // General
  useEffect(() => {
    dispatch(getRubroXContratistasById(contratista ? contratista.id : 0));
  }, [dispatch, contratista]);

  // Acciones
  const columns: GridColDef[] = [
    { field: "id", headerName: "Id",flex: 0.1 },
    {
      field: "rubros",
      headerName: "Rubro",
      flex: 0.8,
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
          <Tooltip title="Habilitar">
            <Switch
              checked={params.row.habilitado}
              onChange={handleChange}
              slotProps={{ input: { "aria-label": "controlled" } }}
              onClick={(e) => {
                (e.currentTarget as HTMLButtonElement).blur();
                setRowSelect(params.row);
              }}
            />
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

  // Estado para el switch
  const [checked, setChecked] = useState(false); //switch chequeado o no
  const [openDialogEditar, setOpenDialogEditar] = useState(false); //Abrir confirmación de cambiar
  const [rowSelect, setRowSelect] = useState<IrubroXContratista>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setOpenDialogEditar(true);
  };
  const handleDialogCloseEditar = (confirm: boolean) => {
    if (confirm && rowSelect) {
      const parsedData = {
        ...rowSelect,
        habilitado: checked,
      };
      delete parsedData.rubros;
      delete parsedData.contratistas;
      dispatch(
        putRubrosXContratistas(
          parsedData,
          parsedData?.contratistasId ? parsedData.contratistasId : 0
        )
      )
        .then(() => toast.info("Elemento modificado"))
        .catch(() => toast.error("Error al modificar el elemento"));
    }
    setOpenDialogEditar(false);
  };

  // Modificar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<IrubroXContratista | null>(null);

  //Borrar
  const [deleteId, setDeleteId] = useState<number | null>(null); // ID a eliminar
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogClose = (confirmDelete: boolean) => {
    if (confirmDelete && deleteId !== null) {
      dispatch(
        deleteRubrosXContratistas(
          deleteId,
          contratista?.id ? contratista.id : 0
        )
      )
        .then(() => toast.error("Elemento eliminado"))
        .catch(() => toast.error("Error al eliminar el elemento"));
    }
    setDeleteId(null);
    setOpenDialog(false);
  };

  return (
    <>
      {/* Rubros X Contratistas*/}
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
          <h2>Rubros X Contratista</h2>
        </div>

        {/* <Paper sx={{ width: "100%", height: "100%" }}> */}
        <Paper>
          <DataGrid
            rows={rubrosXContratistas}
            columns={columns}
            initialState={{
              pagination: { paginationModel: paginationModels },
            }}
            pageSizeOptions={[5, 10, 50, 100]}
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
      <RubrosXContratistasForm
        open={modalAbrir}
        onClose={() => (setModalAbrir(false), setEditState(null))}
        editState={editState}
      />

      {/* Modal Eliminar */}
      <AlertDialogEliminar open={openDialog} onClose={handleDialogClose} />

      {/* Modal Editar */}
      <AlertDialogEditar
        open={openDialogEditar}
        onClose={handleDialogCloseEditar}
      />
    </>
  );
};
