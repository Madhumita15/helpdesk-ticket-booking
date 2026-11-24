import type { InputType, LoginDataType } from "../../../typescript/types/user.type";

export const loginInput: InputType<LoginDataType>[] = [
  {
    label: "Email",
    required: true,
    name: "email",
    type: "email",
  },
  {
    label: "Password",
    required: true,
    name: "password",
    type: "password",
  },
];
