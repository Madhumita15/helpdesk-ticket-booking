import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateUserSchema } from "../../services/validation/user.validation";
import type { UserData } from "../../typescript/types/user.type";
import { userInput } from "../../services/json/inputsData/user.input";
import DynamicInput from "../../components/DynamicInput";
import { useCreateUser, useGetAllUsers } from "../../hooks/useUserHooks";

const UserManagement = () => {
  const { data, isLoading } = useGetAllUsers();
  const users = data?.data || [];
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserData>({
    resolver: yupResolver(CreateUserSchema),
    defaultValues: { name: "", email: "", role: "customer", password: "" },
  });

  const { mutate, isPending } = useCreateUser();

  const onSubmit = (formData: UserData) => {
    mutate(formData, {
      onSuccess: () => {
        setOpen(false);
        reset();
      },
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Create customers and agents (credentials emailed)
          </p>
        </div>
        <Button
          variant="contained"
          startIcon={<Plus size={18} />}
          onClick={() => setOpen(true)}
          sx={{ bgcolor: "#1e293b", textTransform: "none" }}
        >
          Create User
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer
          component={Paper}
          elevation={0}
          className="border border-slate-200"
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "#f1f5f9" }}>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users yet
                  </TableCell>
                </TableRow>
              ) : (
                users.map(
                  (u: {
                    _id: string;
                    name: string;
                    email: string;
                    role: string;
                    isActive: boolean;
                  }) => (
                    <TableRow key={u._id} hover>
                      <TableCell>{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={u.role}
                          size="small"
                          className="!capitalize"
                          color={
                            u.role === "agent" ? "warning" : "primary"
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={u.isActive ? "Active" : "Blocked"}
                          size="small"
                          color={u.isActive ? "success" : "error"}
                        />
                      </TableCell>
                    </TableRow>
                  ),
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create User (Customer / Agent)</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent className="flex flex-col gap-4 !pt-2">
            {userInput.map((input) => (
              <DynamicInput
                key={input.name}
                register={register}
                errors={errors}
                label={input.label}
                name={input.name}
                type={input.type}
                required={input.required}
                loading={isPending}
                options={input.options}
                control={control}
              />
            ))}
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isPending}
              sx={{ bgcolor: "#1e293b" }}
            >
              {isPending ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Create & Send Mail"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default UserManagement;
