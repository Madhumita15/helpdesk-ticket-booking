import * as yup from "yup";

export const CreateUserSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup.string().trim().email("Invalid email").required("Email is required"),
  role: yup
    .string()
    .oneOf(["customer", "agent"], "Role must be customer or agent")
    .required("Role is required"),
  password: yup
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});
