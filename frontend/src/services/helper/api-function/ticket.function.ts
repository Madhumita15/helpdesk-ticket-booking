import { axiosInstance } from "../../../lib/axiosInstance";
import { ENDPOINT } from "../endPoint";
import { getErrorMessage } from "../global.helper";

export const getTickets = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.ticket.list);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const getAssignedTickets = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINT.ticket.assignList);
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const createTicket = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(ENDPOINT.ticket.create, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const updateTicket = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  try {
    const response = await axiosInstance.patch(
      ENDPOINT.ticket.update(id),
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const deleteTicket = async (id: string) => {
  try {
    const response = await axiosInstance.delete(ENDPOINT.ticket.delete(id));
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const assignTicket = async ({
  id,
  assignedTo,
}: {
  id: string;
  assignedTo: string;
}) => {
  try {
    const response = await axiosInstance.patch(ENDPOINT.ticket.assign(id), {
      assignedTo,
    });
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const resolveTicket = async (id: string) => {
  try {
    const response = await axiosInstance.patch(ENDPOINT.ticket.resolve(id));
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const closeTicket = async (id: string) => {
  try {
    const response = await axiosInstance.patch(ENDPOINT.ticket.close(id));
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};

export const updateTicketPriority = async ({
  id,
  priority,
}: {
  id: string;
  priority: string;
}) => {
  try {
    const response = await axiosInstance.patch(ENDPOINT.ticket.priority(id), {
      priority,
    });
    return response.data;
  } catch (error) {
    throw getErrorMessage(error);
  }
};
