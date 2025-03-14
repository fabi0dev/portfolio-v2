import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";

const router = createBrowserRouter(PublicRoutes);

export default function Routers() {
  return <RouterProvider router={router} />;
}
