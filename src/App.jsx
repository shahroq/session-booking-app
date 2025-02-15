import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";

const routerDefinitions = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Registration /> },
      {
        element: <ProtectedRoute roles={["therapist", "client"]} />,
        children: [{ path: "/dashboard", element: <Dashboard /> }],
      },
    ],
  },
];

const router = createBrowserRouter(routerDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
