import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../screens/ErrorScreens/ErrorPage";
import Home from "../screens/OnlineScreens/Home";
import Detail from "../screens/OnlineScreens/Detail";
import Library from "../screens/OnlineScreens/Library";
import Playlist from "../screens/OnlineScreens/Playlist";
import { Search } from "../screens/OnlineScreens/Search";
import Wishlist from "../screens/OnlineScreens/Wishlist";

const OnlineRouter = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
      {
        path: "/library",
        element: <Library />,
      },
      {
        path: "/playlist",
        element: <Playlist />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
    ],
  },
]);

export default OnlineRouter;
