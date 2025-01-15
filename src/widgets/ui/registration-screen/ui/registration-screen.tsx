import { registerUser } from "@/entites/model/user/user-auth/user-auth.api";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Define Zod schema for form validation
const registrationSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type RegistrationFormInputs = z.infer<typeof registrationSchema>;

export const RegistrationScreen = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(registrationSchema),
    mode: "onTouched",
  });

  const email = watch("email");
  const password = watch("password");

  // Form submit handler
  const onSubmit = async (data: RegistrationFormInputs) => {
    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
      });
      console.log("User registered:", response);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#ffffff] rounded-lg shadow-sm p-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-[#000000]">Создать аккаунт</h1>
          <p className="text-[#2f2f2f]">Создайте аккаунт</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div>
            <Input
              label="Ваша почта"
              type="email"
              placeholder="name@example.com"
              value={email || ""}
              onChange={(value) => setValue("email", value)}
              error={errors.email?.message}
            />
          </div>

          {/* Password Input */}
          <div>
            <Input
              label="Ваш пароль"
              type="password"
              placeholder="Your Password"
              value={password || ""}
              onChange={(value) => setValue("password", value)}
              error={errors.password?.message}
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" fullWidth>
            Создать аккаунт
          </Button>
        </form>
      </div>
    </div>
  );
};
