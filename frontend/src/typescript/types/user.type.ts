export type Role = "admin" | "agent" | "customer";

export interface LoginDataType {
  email: string;
  password: string;
}

export interface UserData {
  name: string;
  email: string;
  role?: Role;
  password?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

export interface InputType<T> {
  label: string;
  required: boolean;
  name: keyof T & string;
  type: "text" | "email" | "password" | "number" | "textarea" | "select";
  options?: { label: string; value: string }[];
}

export interface TicketType {
  _id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "assigned" | "resolved" | "closed" | "reopened";
  customer?: string | { _id: string; name: string; email: string };
  createdBy?: string | { _id: string; name: string; email: string };
  assignedTo?: string | { _id: string; name: string; email: string } | null;
  attachment_file?: string | null;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  customerUser?: { name: string; email: string };
  createdByUser?: { name: string; email: string };
  assignedToUser?: { name: string; email: string }[];
}

export interface CreateTicketData {
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  customer?: string;
  attachment_file?: FileList | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
