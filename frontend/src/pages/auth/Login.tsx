import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../services/validation/login.validation";
import type { LoginDataType } from "../../typescript/types/user.type";
import { loginInput } from "../../services/json/inputsData/login.input";
import DynamicInput from "../../components/DynamicInput";
import { useLogin } from "../../hooks/useUserHooks";
import { Button, CircularProgress } from "@mui/material";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>({
    resolver: yupResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginDataType) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Helpdesk</h1>
          <p className="text-slate-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {loginInput.map((input) => (
            <DynamicInput
              key={input.name}
              register={register}
              errors={errors}
              label={input.label}
              name={input.name}
              type={input.type}
              required={input.required}
              loading={isPending}
            />
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isPending}
            sx={{
              py: 1.5,
              bgcolor: "#1e293b",
              "&:hover": { bgcolor: "#0f172a" },
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
