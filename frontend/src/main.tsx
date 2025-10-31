import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Admin } from "./app/pages/Admin.tsx";
import { store } from "./redux/store.tsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Admin />
    </Provider>
  </StrictMode>
);
