import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Admin } from "./app/pages/Admin.tsx";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Admin />
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
