import type { InputType, UserData } from "../../../typescript/types/user.type";

export const userInput: InputType<UserData>[] = [
  {
    label: "Name",
    required: true,
    name: "name",
    type: "text",
  },
  {
    label: "Email",
    required: true,
    name: "email",
    type: "email",
  },
  {
    label: "Role",
    required: true,
    name: "role",
    type: "select",
    options: [
      { label: "Customer", value: "customer" },
      { label: "Agent", value: "agent" },
    ],
  },
  {
    label: "Password (optional)",
    required: false,
    name: "password",
    type: "password",
  },
];
