import { useGetAssignedTickets } from "../../hooks/useTicketHooks";
import { useGetUserProfile } from "../../hooks/useUserHooks";
import TicketTable from "../../components/TicketTable";
import type { TicketType } from "../../typescript/types/user.type";

const AgentTicketManagement = () => {
  const { data, isLoading } = useGetAssignedTickets();
  const { data: profileData } = useGetUserProfile();
  const role = profileData?.data?.role || "agent";
  const tickets: TicketType[] = data?.data || [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Assigned Tickets</h1>
        <p className="text-slate-500 text-sm mt-1">
          Resolve and close tickets assigned to you
        </p>
      </div>

      <TicketTable tickets={tickets} isLoading={isLoading} role={role} />
    </div>
  );
};

export default AgentTicketManagement;
