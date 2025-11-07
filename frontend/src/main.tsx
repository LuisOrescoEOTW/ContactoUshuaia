import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Principal } from "./app/pages/Principal.tsx";
import "./main.css";
import "react-toastify/dist/ReactToastify.css";
import { Prueba } from "./app/pages/Prueba.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <Prueba /> */}
      <Principal />
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
