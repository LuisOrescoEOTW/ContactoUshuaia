import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface AlertDialogProps {
  open: boolean;
  onClose: (result: boolean) => void; // Cambiado para aceptar un valor booleano
}

export default function AlertDialogAgregar({ open, onClose }: AlertDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)} // Cierra el modal y retorna "false"
      disableEnforceFocus
      disableRestoreFocus
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Agregar"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Está seguro de que desea agregar este registro?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => {(e.currentTarget as HTMLButtonElement).blur(); onClose(false)}} variant="contained" color="error">
          No
        </Button>
        <Button onClick={(e) => {(e.currentTarget as HTMLButtonElement).blur(); onClose(true)}} variant="contained" color="success" autoFocus>
          Sí
        </Button>
      </DialogActions>
    </Dialog>
  );
}

