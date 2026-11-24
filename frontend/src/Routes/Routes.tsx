import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminTicketManagement from "../pages/admin/TicketManagement";
import UserManagement from "../pages/admin/UserManagement";
import AgentTicketManagement from "../pages/agent/TicketManagement";
import Ticket from "../pages/user/Ticket";
import Wrapper from "../layout/Wrapper";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <Wrapper />,
    children: [
      { index: true, element: <Navigate to="ticket-management" replace /> },
      { path: "ticket-management", element: <AdminTicketManagement /> },
      { path: "user-management", element: <UserManagement /> },
    ],
  },
  {
    path: "/agent",
    element: <Wrapper />,
    children: [
      { index: true, element: <Navigate to="ticket-management" replace /> },
      { path: "ticket-management", element: <AgentTicketManagement /> },
    ],
  },
  {
    path: "/user",
    element: <Wrapper />,
    children: [
      { index: true, element: <Navigate to="ticket" replace /> },
      { path: "ticket", element: <Ticket /> },
    ],
  },
]);

export default Routes;
