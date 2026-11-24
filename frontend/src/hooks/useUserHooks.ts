import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  getAllUsers,
  getUserProfile,
  login,
  logout,
} from "../services/helper/api-function/auth.function";
import { toast } from "sonner";
import type { LoginDataType, UserData } from "../typescript/types/user.type";
import { useNavigate } from "react-router-dom";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-user"],
    mutationFn: (data: UserData) => createUser(data),
    onSuccess: (res) => {
      toast.success(res?.message || "User created");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginDataType) => login(data),
    onSuccess: (res) => {
      toast.success(res?.message || "Login successful");
      const role = res?.data?.role;
      console.log("role", role)
      if (role === "admin") navigate("/admin/ticket-management");
      else if (role === "agent") navigate("/agent/ticket-management");
      else navigate("/user/ticket");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: (res) => {
      toast.success(res?.message || "Logged out");
      queryClient.clear();
      navigate("/login");
    },
    onError: (err: string) => {
      toast.error(err);
      queryClient.clear();
      navigate("/login");
    },
  });
};

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["get/profile"],
    queryFn: getUserProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};
