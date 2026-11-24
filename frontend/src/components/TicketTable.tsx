import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import { Pencil, Trash2, CheckCircle, XCircle, UserPlus } from "lucide-react";
import type { TicketType } from "../typescript/types/user.type";
import {
  useAssignTicket,
  useCloseTicket,
  useDeleteTicket,
  useResolveTicket,
} from "../hooks/useTicketHooks";
import { useGetAllUsers } from "../hooks/useUserHooks";

const priorityColor: Record<string, "default" | "info" | "warning" | "error"> = {
  low: "default",
  medium: "info",
  high: "warning",
  urgent: "error",
};

const statusColor: Record<
  string,
  "default" | "primary" | "success" | "warning" | "error"
> = {
  open: "primary",
  assigned: "warning",
  resolved: "success",
  closed: "default",
  reopened: "error",
};

interface Props {
  tickets: TicketType[];
  isLoading: boolean;
  role: string;
  onEdit?: (ticket: TicketType) => void;
}

const TicketTable = ({ tickets, isLoading, role, onEdit }: Props) => {
  const { mutate: deleteMutate, isPending: deleting } = useDeleteTicket();
  const { mutate: resolveMutate, isPending: resolving } = useResolveTicket();
  const { mutate: closeMutate, isPending: closing } = useCloseTicket();
  const { mutate: assignMutate, isPending: assigning } = useAssignTicket();
  const { data: usersData } = useGetAllUsers();
  const agents =
    usersData?.data?.filter((u: { role: string }) => u.role === "agent") || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <CircularProgress />
      </div>
    );
  }

  if (!tickets?.length) {
    return (
      <div className="text-center py-16 text-slate-500">No tickets found</div>
    );
  }

  const getName = (obj: unknown) => {
    if (!obj) return "—";
    if (typeof obj === "string") return obj;
    if (Array.isArray(obj) && obj[0]?.name) return obj[0].name;
    if (typeof obj === "object" && obj !== null && "name" in obj)
      return (obj as { name: string }).name;
    return "—";
  };

  return (
    <TableContainer component={Paper} elevation={0} className="border border-slate-200">
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "#f1f5f9" }}>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Priority</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Customer</strong></TableCell>
            {(role === "admin" || role === "agent") && (
              <TableCell><strong>Assigned To</strong></TableCell>
            )}
            <TableCell><strong>Created</strong></TableCell>
            <TableCell align="right"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((t) => (
            <TableRow key={t._id} hover>
              <TableCell>
                <div className="font-medium max-w-[200px] truncate">{t.title}</div>
                <div className="text-xs text-slate-500 max-w-[220px] truncate">
                  {t.description}
                </div>
              </TableCell>
              <TableCell>
                <Chip
                  label={t.priority}
                  size="small"
                  color={priorityColor[t.priority] || "default"}
                  className="!capitalize"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={t.status}
                  size="small"
                  color={statusColor[t.status] || "default"}
                  className="!capitalize"
                />
              </TableCell>
              <TableCell>
                {getName(t.customerUser || t.customer)}
              </TableCell>
              {(role === "admin" || role === "agent") && (
                <TableCell>
                  {role === "admin" && t.status === "open" ? (
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        displayEmpty
                        value=""
                        disabled={assigning}
                        onChange={(e) =>
                          assignMutate({
                            id: t._id,
                            assignedTo: e.target.value as string,
                          })
                        }
                      >
                        <MenuItem value="" disabled>
                          Assign agent
                        </MenuItem>
                        {agents.map(
                          (a: { _id: string; name: string }) => (
                            <MenuItem key={a._id} value={a._id}>
                              {a.name}
                            </MenuItem>
                          ),
                        )}
                      </Select>
                    </FormControl>
                  ) : (
                    getName(t.assignedToUser || t.assignedTo)
                  )}
                </TableCell>
              )}
              <TableCell>
                {t.createdAt
                  ? new Date(t.createdAt).toLocaleDateString()
                  : "—"}
              </TableCell>
              <TableCell align="right">
                <div className="flex items-center justify-end gap-1">
                  {(role === "customer" || role === "admin") &&
                    t.status !== "closed" &&
                    onEdit && (
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => onEdit(t)}>
                          <Pencil size={16} />
                        </IconButton>
                      </Tooltip>
                    )}

                  {(role === "customer" || role === "admin") && (
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        disabled={deleting}
                        onClick={() => {
                          if (confirm("Soft delete this ticket?"))
                            deleteMutate(t._id);
                        }}
                      >
                        <Trash2 size={16} />
                      </IconButton>
                    </Tooltip>
                  )}

                  {role === "agent" && t.status === "assigned" && (
                    <Tooltip title="Resolve">
                      <IconButton
                        size="small"
                        color="success"
                        disabled={resolving}
                        onClick={() => resolveMutate(t._id)}
                      >
                        <CheckCircle size={16} />
                      </IconButton>
                    </Tooltip>
                  )}

                  {role === "agent" && t.status === "resolved" && (
                    <Tooltip title="Close">
                      <IconButton
                        size="small"
                        color="default"
                        disabled={closing}
                        onClick={() => closeMutate(t._id)}
                      >
                        <XCircle size={16} />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TicketTable;
