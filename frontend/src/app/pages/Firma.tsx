import { Box } from "@mui/system";

// Import dinámico para iconos de rubros
const iconos = import.meta.glob("../images/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const Firma = () => {
  return (
    <>
      <Box
      >
        <img
          src={iconos[`../images/TarjetaOrescoSoft.png`]}
          alt={"Tarjeta OrescoSoft"}
          style={{ height: "20vh", borderRadius: "8px" }}
        />
      </Box>
    </>
  );
};
