import "./index.css";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/lobby/:id",
    element: <Lobby />,
  }
]);

ReactDOM.createRoot(document.getElementById("root"))
  .render(
    <RouterProvider router={router}>
      {router}
    </RouterProvider>
  );