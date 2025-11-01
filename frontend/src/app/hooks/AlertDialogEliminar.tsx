import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface AlertDialogProps {
  open: boolean;
  onClose: (result: boolean) => void; // Cambiado para aceptar un valor booleano
}

export default function AlertDialogEliminar({ open, onClose }: AlertDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)} // Cierra el modal y retorna "false"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Eliminar"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Está seguro de que desea eliminar este registro?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} variant="contained" color="error">
          No
        </Button>
        <Button onClick={() => onClose(true)} variant="contained" color="success" autoFocus>
          Sí
        </Button>
      </DialogActions>
    </Dialog>
  );
}

