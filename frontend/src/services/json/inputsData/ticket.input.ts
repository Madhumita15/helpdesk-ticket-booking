import type { CreateTicketData, InputType } from "../../../typescript/types/user.type";

export const ticketInput: InputType<CreateTicketData>[] = [
  {
    label: "Title",
    required: true,
    name: "title",
    type: "text",
  },
  {
    label: "Description",
    required: true,
    name: "description",
    type: "textarea",
  },
  {
    label: "Priority",
    required: true,
    name: "priority",
    type: "select",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
      { label: "Urgent", value: "urgent" },
    ],
  },
];
