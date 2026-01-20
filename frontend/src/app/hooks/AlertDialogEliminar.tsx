import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface AlertDialogProps {
  open: boolean;
  onClose: (result: boolean) => void; // Cambiado para aceptar un valor booleano
  mensajeOpt?: string;
}

export default function AlertDialogEliminar({ open, onClose, mensajeOpt }: AlertDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)} // Cierra el modal y retorna "false"
      disableEnforceFocus
      disableRestoreFocus
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Eliminar"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Está seguro de que desea eliminar este registro?
          {mensajeOpt && <><br /><br />{mensajeOpt}</>}
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

