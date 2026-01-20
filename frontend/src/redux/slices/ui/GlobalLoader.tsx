import { Backdrop } from "@mui/material";
import type { JSX, FC } from "react";
import { useGlobalLoading } from "./useGlobalLoading";
import { useLocation } from "react-router-dom";
import "./ui.css";

interface GlobalLoaderProps {
  excludePaths?: string[]; // paths donde NO mostrar el loader
}

export const GlobalLoader: FC<GlobalLoaderProps> = ({ excludePaths = [] }): JSX.Element => {
  const loading = useGlobalLoading();
  const location = useLocation(); // hook para saber la URL actual

  // Si estamos en un path excluido, no mostrar el loader
  if (excludePaths.includes(location.pathname)) return <></>;

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={loading}
    >
      <span className="loader"></span>
    </Backdrop>
  );
};
