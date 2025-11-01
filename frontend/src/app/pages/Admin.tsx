import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getRubros } from "../../redux/slices/rubros/rubrosThunks";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  Modal,
  Paper,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  type GridColDef,
  type GridRowSelectionModel,
} from "@mui/x-data-grid";
import { Add, Delete, Edit, Style } from "@mui/icons-material";
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
        width: "99vw",
        height: "40vh",
        // margin: "0 auto",
      }}
    >
      <div>
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

        <Paper sx={{ width: "100%", height: "100%" }}>
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
              border: 2,
              borderColor: "#D9D9D9",
              "& .MuiDataGrid-virtualScroller": { overflow: "auto" },
            }}
          />
        </Paper>
      </div>

      {/* <Dialog open={modalAbrir} onClose={() => setModalAbrir(false)}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#008F9E",
            color: "white",
          }}
        >
          {editState ? "Editar Rubro" : "Nuevo Rubro"}
        </DialogTitle>
        <DialogContent>
          <RubrosForm editState={editState} />
        </DialogContent>
      </Dialog> */}
      <RubrosForm
        open={modalAbrir}
        onClose={() => (setModalAbrir(false), setEditState(null))}
        editState={editState}
      />
    </div>
  );
};
