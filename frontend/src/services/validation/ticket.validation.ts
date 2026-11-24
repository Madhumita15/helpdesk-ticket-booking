import * as yup from "yup";

export const TicketSchema = yup.object({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
  priority: yup
    .string()
    .oneOf(["low", "medium", "high", "urgent"], "Invalid priority")
    .required("Priority is required"),
  customer: yup.string().optional().nullable(),
});
