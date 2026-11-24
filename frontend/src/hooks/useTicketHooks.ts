import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignTicket,
  closeTicket,
  createTicket,
  deleteTicket,
  getAssignedTickets,
  getTickets,
  resolveTicket,
  updateTicket,
  updateTicketPriority,
} from "../services/helper/api-function/ticket.function";
import { toast } from "sonner";

export const useGetTickets = () => {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
  });
};

export const useGetAssignedTickets = () => {
  return useQuery({
    queryKey: ["assigned-tickets"],
    queryFn: getAssignedTickets,
  });
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => createTicket(formData),
    onSuccess: (res) => {
      toast.success(res?.message || "Ticket created");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (err: string) => toast.error(err),
  });
};

export const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      updateTicket({ id, formData }),
    onSuccess: (res) => {
      toast.success(res?.message || "Ticket updated");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      queryClient.invalidateQueries({ queryKey: ["assigned-tickets"] });
    },
    onError: (err: string) => toast.error(err),
  });
};

export const useDeleteTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTicket(id),
    onSuccess: (res) => {
      toast.success(res?.message || "Ticket deleted");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (err: string) => toast.error(err),
  });
};

export const useAssignTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, assignedTo }: { id: string; assignedTo: string }) =>
      assignTicket({ id, assignedTo }),
    onSuccess: (res) => {
      toast.success(res?.message || "Ticket assigned");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (err: string) => toast.error(err),
  });
};

export const useResolveTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => resolveTicket(id),
    onSuccess: (res) => {
      toast.success(res?.message || "Ticket resolved");
      queryClient.invalidateQueries({ queryKey: ["assigned-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (err: string) => toast.error(err),
  });
};

export const useCloseTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => closeTicket(id),
    onSuccess: (res) => {
      toast.success(res?.message || "Ticket closed");
      queryClient.invalidateQueries({ queryKey: ["assigned-tickets"] });
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (err: string) => toast.error(err),
  });
};

export const useUpdatePriority = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, priority }: { id: string; priority: string }) =>
      updateTicketPriority({ id, priority }),
    onSuccess: (res) => {
      toast.success(res?.message || "Priority updated");
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
    onError: (err: string) => toast.error(err),
  });
};
