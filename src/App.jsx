import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/Error404";

const routerDefinitions = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Registration /> },
      {
        element: <ProtectedRoute roles={["therapist"]} />,
        children: [{ path: "therapist", element: <Dashboard /> }],
      },
      {
        element: <ProtectedRoute roles={["client"]} />,
        children: [{ path: "client", element: <Dashboard /> }],
      },
    ],
  },
];

const router = createBrowserRouter(routerDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
