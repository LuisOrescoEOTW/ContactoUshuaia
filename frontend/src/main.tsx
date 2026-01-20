import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./main.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@emotion/react";
import themeRoboto from "./themeRoboto.ts";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes.tsx";
import { GlobalLoader } from "./redux/slices/ui/GlobalLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={themeRoboto}>
        <BrowserRouter>
          {/* <GlobalLoader />   */}
          {/* Loader que se oculta en /admin */}
          <GlobalLoader excludePaths={["/admin"]} />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
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
