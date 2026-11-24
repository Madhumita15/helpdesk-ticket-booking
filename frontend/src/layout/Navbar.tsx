import { useGetUserProfile, useLogout } from "../hooks/useUserHooks";
import { LogOut, User } from "lucide-react";
import { Button, CircularProgress } from "@mui/material";

const Navbar = () => {
  const { data, isLoading } = useGetUserProfile();
  const profile = data?.data;
  const { mutate: logout, isPending } = useLogout();

  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <h2 className="text-lg font-semibold tracking-wide">
          Helpdesk Ticket System
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {isLoading ? (
          <CircularProgress size={20} sx={{ color: "white" }} />
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <User size={18} />
            <span>
              {profile?.name}{" "}
              <span className="opacity-70 capitalize">({profile?.role})</span>
            </span>
          </div>
        )}
        <Button
          onClick={() => logout()}
          disabled={isPending}
          size="small"
          startIcon={isPending ? <CircularProgress size={14} /> : <LogOut size={16} />}
          sx={{
            color: "white",
            borderColor: "rgba(255,255,255,0.4)",
            textTransform: "none",
            "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.1)" },
          }}
          variant="outlined"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
