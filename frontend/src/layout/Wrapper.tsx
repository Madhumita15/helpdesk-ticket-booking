import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useGetUserProfile } from "../hooks/useUserHooks";
import { CircularProgress } from "@mui/material";

const Wrapper = () => {
  const { data, isLoading, isError } = useGetUserProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <CircularProgress />
      </div>
    );
  }

  if (isError || !data?.data) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex w-full min-h-screen">
      <aside className="w-64 bg-slate-800 text-white fixed left-0 top-0 h-screen z-30">
        <Sidebar />
      </aside>

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-slate-700 text-white px-6 py-4 shadow">
          <Navbar />
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Wrapper;
