import { createTheme } from "@mui/material/styles";


// Importamos las fuentes TTF
import RobotoSlabLight from "../src/app/fonts/roboto/RobotoSlab-Light.ttf";
import RobotoSlabRegular from "../src/app/fonts/roboto/RobotoSlab-Regular.ttf";
import RobotoSlabBold from "../src/app/fonts/roboto/RobotoSlab-Bold.ttf";

const themeRoboto = createTheme({
  typography: {
    fontFamily: "Roboto Slab, serif"
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Roboto Slab';
          src: url(${RobotoSlabLight}) format('truetype');
          font-weight: 300;
          font-style: normal;
        }
        @font-face {
          font-family: 'Roboto Slab';
          src: url(${RobotoSlabRegular}) format('truetype');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'Roboto Slab';
          src: url(${RobotoSlabBold}) format('truetype');
          font-weight: 700;
          font-style: normal;
        }
      `,
    },
  },
});

export default themeRoboto;
