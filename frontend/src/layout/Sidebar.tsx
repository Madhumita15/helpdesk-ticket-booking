import { NavLink } from "react-router-dom";
import { useGetUserProfile } from "../hooks/useUserHooks";
import {
  Ticket,
  Users,
  LayoutDashboard,
  Headphones,
} from "lucide-react";
import { CircularProgress } from "@mui/material";

const menuByRole: Record<
  string,
  { label: string; path: string; icon: React.ReactNode }[]
> = {
  admin: [
    {
      label: "Ticket Management",
      path: "/admin/ticket-management",
      icon: <Ticket size={18} />,
    },
    {
      label: "User Management",
      path: "/admin/user-management",
      icon: <Users size={18} />,
    },
  ],
  agent: [
    {
      label: "Ticket Management",
      path: "/agent/ticket-management",
      icon: <Ticket size={18} />,
    },
  ],
  customer: [
    {
      label: "My Tickets",
      path: "/user/ticket",
      icon: <Ticket size={18} />,
    },
  ],
};

const Sidebar = () => {
  const { data, isLoading } = useGetUserProfile();
  const role = data?.data?.role as string | undefined;
  const menus = role ? menuByRole[role] || [] : [];

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center gap-2 mb-8 px-2 pt-2">
        <Headphones className="text-indigo-400" size={28} />
        <span className="text-xl font-bold tracking-tight">Helpdesk</span>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <CircularProgress size={28} sx={{ color: "white" }} />
        </div>
      ) : (
        <nav className="flex flex-col gap-1">
          {menus.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}

      <div className="mt-auto pt-6 border-t border-slate-600 text-xs text-slate-400 px-2">
        Role-based access
      </div>
    </div>
  );
};

export default Sidebar;
