import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TicketSchema } from "../services/validation/ticket.validation";
import type {
  CreateTicketData,
  TicketType,
} from "../typescript/types/user.type";
import { useEffect, useState } from "react";
import { useCreateTicket, useUpdateTicket } from "../hooks/useTicketHooks";
import { useGetAllUsers } from "../hooks/useUserHooks";
import DynamicInput from "./DynamicInput";
import { ticketInput } from "../services/json/inputsData/ticket.input";

interface Props {
  open: boolean;
  onClose: () => void;
  ticket?: TicketType | null;
  role?: string;
}

const TicketDialog = ({ open, onClose, ticket, role }: Props) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const isEdit = !!ticket;
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreateTicketData>({
    resolver: yupResolver(TicketSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      customer: "",
      attachment_file: null,
    },
  });

  const { mutate: createMutate, isPending: creating } = useCreateTicket();
  const { mutate: updateMutate, isPending: updating } = useUpdateTicket();
  const { data: usersData } = useGetAllUsers();
  const customers =
    usersData?.data?.filter((u: { role: string }) => u.role === "customer") ||
    [];

  useEffect(() => {
    if (ticket) {
      reset({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        customer: "",
      });
      if (ticket.attachment_file) {
        setPreviewImage(ticket.attachment_file);
      }
    } else {
      reset({
        title: "",
        description: "",
        priority: "medium",
        customer: "",
      });
    }
  }, [ticket, open, reset]);

  const loading = creating || updating;

  const onSubmit = (data: CreateTicketData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("priority", data.priority);
    if (role === "admin" && data.customer) {
      formData.append("customer", data.customer);
    }
    if (data.attachment_file) {
      formData.append("attachment_file", data.attachment_file);
    }

    if (isEdit && ticket) {
      updateMutate(
        { id: ticket._id, formData },
        { onSuccess: () => onClose() },
      );
    } else {
      createMutate(formData, { onSuccess: () => onClose() });
    }
    setPreviewImage(null);
    reset({
      title: "",
      description: "",
      priority: "medium",
      customer: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? "Update Ticket" : "Create Ticket"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-4 !pt-2">
          {ticketInput.map((input) => (
            <DynamicInput
              key={input.name}
              register={register}
              errors={errors}
              label={input.label}
              name={input.name}
              type={input.type}
              required={input.required}
              loading={loading}
              options={input.options}
              control={control}
            />
          ))}

          {role === "admin" && !isEdit && (
            <Controller
              name="customer"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  fullWidth
                  label="Customer"
                  value={field.value || ""}
                >
                  <MenuItem value="">Select customer</MenuItem>
                  {customers.map(
                    (c: { _id: string; name: string; email: string }) => (
                      <MenuItem key={c._id} value={c._id}>
                        {c.name} ({c.email})
                      </MenuItem>
                    ),
                  )}
                </TextField>
              )}
            />
          )}

          <div className="flex flex-col gap-2">
            <Button
              variant="outlined"
              component="label"
              disabled={loading}
              sx={{ textTransform: "none" }}
            >
              Upload Attachment
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (!file) return;

                  if (file.size >= 1024 * 1024) {
                    alert("File size must be less than 1 MB");
                    e.target.value = "";
                    return;
                  }

                  setValue("attachment_file", file, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });

                  setPreviewImage(URL.createObjectURL(file));
                }}
              />
            </Button>

            {previewImage && (
              <div className="flex items-center gap-3">
                <img
                  src={previewImage}
                  alt="Attachment preview"
                  className="w-20 h-20 rounded-full object-cover border"
                />

                <Button
                  color="error"
                  size="small"
                  onClick={() => {
                    setPreviewImage(null);
                    setValue("attachment_file", undefined, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ bgcolor: "#1e293b" }}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : isEdit ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TicketDialog;
