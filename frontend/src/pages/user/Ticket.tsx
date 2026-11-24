import { useState } from "react";
import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import { useGetTickets } from "../../hooks/useTicketHooks";
import { useGetUserProfile } from "../../hooks/useUserHooks";
import TicketTable from "../../components/TicketTable";
import TicketDialog from "../../components/TicketDialog";
import type { TicketType } from "../../typescript/types/user.type";

const Ticket = () => {
  const { data, isLoading } = useGetTickets();
  const { data: profileData } = useGetUserProfile();
  const role = profileData?.data?.role || "customer";
  const tickets: TicketType[] = data?.data || [];

  const [open, setOpen] = useState(false);
  const [editTicket, setEditTicket] = useState<TicketType | null>(null);

  const handleEdit = (ticket: TicketType) => {
    setEditTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditTicket(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Tickets</h1>
          <p className="text-slate-500 text-sm mt-1">
            Create and manage your support tickets
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => {
            setEditTicket(null);
            setOpen(true);
          }}
          sx={{ bgcolor: "#1e293b", textTransform: "none" }}
        >
          Create Ticket
        </Button>
      </div>

      <TicketTable
        tickets={tickets}
        isLoading={isLoading}
        role={role}
        onEdit={handleEdit}
      />

      <TicketDialog
        open={open}
        onClose={handleClose}
        ticket={editTicket}
        role={role}
      />
    </div>
  );
};

export default Ticket;
