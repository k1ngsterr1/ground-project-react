import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";

export const LoginScreen = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#ffffff] rounded-lg shadow-sm p-8">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-bold text-[#000000]">Логин</h1>
          <p className="text-[#2f2f2f]">Войдите в приложение</p>
        </div>
        <form className="space-y-6">
          <Input
            label="Ваша почта"
            type="email"
            placeholder="name@example.com"
            required
          />
          <Input
            label="Ваш пароль"
            type="password"
            placeholder="Your Password"
            required
          />
          <Button type="submit" fullWidth>
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};
