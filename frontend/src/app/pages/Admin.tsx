import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getRubros } from "../../redux/slices/rubros/rubrosThunks";
import { Fab, Modal, Paper, Tooltip } from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Add, Delete, Edit } from "@mui/icons-material";
import type { Irubros } from "../models/Irubros";
import { RubrosForm } from "../components/RubrosForm";

export const Admin = () => {
  // Leer
  const dispatch = useDispatch<AppDispatch>();
  const { rubros = [] } = useSelector((state: RootState) => state.rubros);

  // General
  useEffect(() => {
    dispatch(getRubros());
  }, [dispatch]);

  //
  const columnsRubros: GridColDef[] = [
    { field: "id", headerName: "Id", flex: 0.2 },
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
          <Tooltip title="Editar">
            <Fab
              size="small"
              color="primary"
              onClick={() => (setEditState(params.row), setModalAbrir(true))}
            >
              <Edit fontSize="small" />
            </Fab>
          </Tooltip>
          <Tooltip title="Eliminar">
            <Fab
              size="small"
              color="error"
              onClick={() => handleDelete(params.row.id)}
            >
              <Delete fontSize="small" />
            </Fab>
          </Tooltip>
        </div>
      ),
    },
  ];

  const paginationModelRubros = { page: 0, pageSize: 5 };

  // Extraer el id del Set en newSelectionModel.ids
  const handleRowSelection = (newSelectionModel: GridRowSelectionModel) => {
    if (
      newSelectionModel &&
      typeof newSelectionModel === "object" &&
      newSelectionModel.ids instanceof Set
    ) {
      const id = Array.from(newSelectionModel.ids)[0];
      if (id !== undefined) {
        console.log(id);
      }
    }
  };

  // Agregar - Modificar
  const [modalAbrir, setModalAbrir] = useState(false);
  const [editState, setEditState] = useState<Irubros | null>(null);

  // Función para eliminar
  const handleDelete = (id: number) => {
    // Aquí puedes agregar la lógica para eliminar
    console.log("Eliminar id:", id);
    // Por ejemplo: dispatch(deleteRubros(id));
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        width: "80vw",
        height: "52vh",
        // margin: "0 auto",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Rubros</h2>
          <div style={{ textAlign: "end", paddingRight: "2%" }}>
            <Tooltip title="Agregar" aria-label="add">
              <Fab
                color="success"
                onClick={() => (setModalAbrir(true), setEditState(null))}
              >
                <Add />
              </Fab>
            </Tooltip>
          </div>
        </div>

        <Paper sx={{ width: "100%", height: "92%" }}>
          <DataGrid
            rows={rubros}
            columns={columnsRubros}
            initialState={{
              pagination: { paginationModel: paginationModelRubros },
            }}
            pageSizeOptions={[5, 10, 50, 100]}
            onRowSelectionModelChange={handleRowSelection}
            checkboxSelection={false}
            sx={{
              width: "100%",
              height: "100%",
              border: 0,
              "& .MuiDataGrid-virtualScroller": { overflow: "auto" },
            }}
          />
        </Paper>
      </div>

      {/* Modal Nuevo - Editar */}
      <Modal open={modalAbrir} onClose={() => (setModalAbrir(false), setEditState(null))} >
        <RubrosForm editState={editState} />
      </Modal>
    </div>
  );
};
