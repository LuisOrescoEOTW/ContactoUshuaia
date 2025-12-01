import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
// import { Principal } from "./app/pages/Principal.tsx";
import "./main.css";
import "react-toastify/dist/ReactToastify.css";
// import { Prueba } from "./app/pages/Prueba.tsx";
import { ThemeProvider } from "@emotion/react";
import themeRoboto from "./themeRoboto.ts";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={themeRoboto}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
      {/* <Prueba /> */}
      {/* <Principal /> */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </Provider>
  </StrictMode>
);
