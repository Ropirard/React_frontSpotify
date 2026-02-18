import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Contexted'authentification - disponible dans toute l'app */}
    <AuthContextProvider>
      {/* Store redux - Gère l'état global (albums, artistes, player, ...) */}
      <Provider store={store}>
        {/* Route - Gère la navigation entre les pages */}
        <AppRouter />
      </Provider>
    </AuthContextProvider>
  </StrictMode>,
);
