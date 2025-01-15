import { login } from "@/entites/model/user/user-auth/user-auth.api";
import { useAuthStore } from "@/entites/model/user/user-auth/use-auth-store";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

// Define Zod schema for form validation
const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginScreen = () => {
  const navigate = useNavigate();
  const { setAuthorized, setType } = useAuthStore();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const email = watch("email");
  const password = watch("password");

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });
      console.log("Login successful:", response);
      
      // Save auth token
      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }
      
      // Update auth store with user data
      setAuthorized(true);
      setType(response.role || "user");
      
      // Trigger a reload of user data to get the full user info including ID
      await useAuthStore.getState().loadToken();
      
      navigate("/"); // Redirect to the dashboard or another page
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#ffffff] rounded-lg shadow-sm p-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-[#000000]">Логин</h1>
          <p className="text-[#2f2f2f]">Войдите в приложение</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <Input
            label="Ваша почта"
            type="email"
            placeholder="name@example.com"
            value={email || ""}
            onChange={(value) => setValue("email", value)}
            error={errors.email?.message}
          />
          {/* Password Input */}
          <Input
            label="Ваш пароль"
            type="password"
            placeholder="Your Password"
            value={password || ""}
            onChange={(value) => setValue("password", value)}
            error={errors.password?.message}
          />
          <Button type="submit" fullWidth>
            Войти
          </Button>
        </form>
        <div className="flex w-full items-center justify-center mt-4">
          <Link to="/register" className="text-green">
            Создать аккаунт
          </Link>
        </div>
      </div>
    </div>
  );
};
