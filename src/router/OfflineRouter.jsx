import { createBrowserRouter } from "react-router-dom";
import HomeOffline from "../screens/OfflineScreens/HomeOffline";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Login from "../screens/OfflineScreens/Login";
import Register from "../screens/OfflineScreens/Register";

const OfflineRouter = createBrowserRouter([
  {
    element: <HomeOffline />, // Eleent qui sera retourné sur toutes les vues
    errorElement: <ErrorPage />, // Element retourné en cas d'erreur
    children: [
      {
        path: "/", // Chemin de la vue
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default OfflineRouter;
