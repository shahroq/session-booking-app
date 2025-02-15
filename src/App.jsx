import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import TherapistDashboard from "./pages/TherapistDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Error404 from "./pages/Error404";

const routerDefinitions = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegistrationPage /> },
      {
        element: <ProtectedRoute roles={["therapist"]} />,
        children: [{ path: "therapist", element: <TherapistDashboard /> }],
      },
      {
        element: <ProtectedRoute roles={["client"]} />,
        children: [{ path: "client", element: <ClientDashboard /> }],
      },
    ],
  },
];

const router = createBrowserRouter(routerDefinitions);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
