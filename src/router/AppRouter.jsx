import React from "react";
import { RouterProvider } from "react-router-dom";
import OfflineRouter from "./OfflineRouter";

const AppRouter = () => {
  // TODO Prévoir context d'authentification et de session pour savoir quel router choisir

  return <RouterProvider router={OfflineRouter} />;
};

export default AppRouter;
