import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  Control,
  Controller,
} from "react-hook-form";
import { Controller as RHFController } from "react-hook-form";

interface DynamicInputInterface<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  label: string;
  name: Path<T>;
  type: "text" | "email" | "password" | "number" | "textarea" | "select";
  required: boolean;
  loading?: boolean;
  options?: { label: string; value: string }[];
  control?: Control<T>;
}

const DynamicInput = <T extends FieldValues>({
  register,
  errors,
  label,
  name,
  type,
  required,
  loading = false,
  options = [],
  control,
}: DynamicInputInterface<T>) => {
  const DynamicError = errors[name];
  const errorMessage = DynamicError?.message as string | undefined;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  if (type === "select" && control) {
    return (
      <FormControl fullWidth error={!!DynamicError} disabled={loading}>
        <InputLabel>
          {label}
          {required && <span className="text-red-600"> *</span>}
        </InputLabel>
        <RHFController
          name={name}
          control={control}
          render={({ field }) => (
            <Select {...field} label={label} value={field.value || ""}>
              {options.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    );
  }

  return (
    <div className="relative w-full">
      <TextField
        fullWidth
        type={isPassword && !showPassword ? "password" : type === "number" ? "number" : "text"}
        disabled={loading}
        label={
          required ? (
            <>
              {label}
              <span className="text-red-600"> *</span>
            </>
          ) : (
            label
          )
        }
        placeholder={`Enter ${label.toLowerCase()}`}
        {...register(name)}
        rows={type === "textarea" ? 3 : undefined}
        multiline={type === "textarea"}
        error={!!DynamicError}
        helperText={errorMessage}
        variant="outlined"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
};

export default DynamicInput;
