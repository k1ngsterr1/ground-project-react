"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, UserPlus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { registerManagerUser } from "@/entites/model/user/user-manager/auth-manager.api";
import { RegisterDto } from "@/entites/model/user/user-auth/user-auth.dto";
import { useGetUsers } from "@/entites/model/user/user-auth/use-get-users";
import Skeleton from "react-loading-skeleton";
import { useChangeRole } from "@/entites/model/user/user-roles/use-change-user-role";
import { useNavigate } from "react-router-dom";

type UserRole = "user" | "manager" | "admin";

interface UserData {
  id: number;
  email: string;
  role: UserRole;
}

export default function UserManagement() {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<keyof UserData>("email");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newManager, setNewManager] = useState({ email: "", password: "" });
  const { mutateAsync: changeRole } = useChangeRole();
  const { mutateAsync: registerManager, isPending } = useMutation({
    mutationFn: async (data: RegisterDto) => registerManagerUser(data), // Mutation function
    onSuccess: () => {
      // Close the dialog and reset the form on success
      setIsDialogOpen(false);
      setNewManager({ email: "", password: "" });
      console.log("Manager registered successfully!");
    },
    onError: (error: any) => {
      console.error("Error registering manager:", error);
    },
  });

  const { data: users, isLoading } = useGetUsers();

  const handleSort = (column: keyof UserData) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleManagerRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Use the registerUser mutation to register a new manager
      await registerManager({
        email: newManager.email,
        password: newManager.password,
      });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await changeRole({ id: userId, role: newRole });
    } catch (error) {
      console.error("Failed to change role:", error);
    }
  };

  const roleColors: Record<any, string> = {
    user: "bg-blue-100 text-blue-800",
    manager: "bg-green text-white",
    admin: "bg-red-500 text-white",
  };

  return (
    <div className="max-w-4xl flex flex-col gap-8  items-center justify-center m-auto">
      <Button onClick={() => navigate("/")} className="mt-8">
        Вернуться на главную
      </Button>
      <Card className="w-full mt-16 max-h-[900px] m-auto overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <CardHeader>
          <div className="flex justify-between items-center mb-8">
            <CardTitle>Таблица Пользователей</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={isPending}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  {isPending ? "Добавление..." : "Добавить менеджера"}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Регистрация нового менеджера</DialogTitle>
                  <DialogDescription>
                    Введите данные нового менеджера здесь. Нажмите сохранить,
                    когда закончите.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleManagerRegistration}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        className="col-span-3"
                        value={newManager.email}
                        onChange={(e) =>
                          setNewManager({
                            ...newManager,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Пароль
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        className="col-span-3"
                        value={newManager.password}
                        onChange={(e) =>
                          setNewManager({
                            ...newManager,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isPending}>
                      {isPending ? "Сохранение..." : "Сохранить"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Поиск пользователей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {["Эл.Почта", "Роль", "Действия"].map((header) => (
                  <TableHead
                    key={header}
                    className="cursor-pointer"
                    onClick={() =>
                      handleSort(header.toLowerCase() as keyof UserData)
                    }
                  >
                    <div className="flex items-center">
                      {header}
                      {sortColumn === header.toLowerCase() &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={`skeleton-${index}`}>
                      <TableCell>
                        <Skeleton width="150px" height="20px" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="80px" height="20px" />
                      </TableCell>
                      <TableCell>
                        <Skeleton width="120px" height="40px" />
                      </TableCell>
                    </TableRow>
                  ))
                : users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${roleColors[user.role]} px-2 py-1`}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onValueChange={(value: UserRole) =>
                            handleRoleChange(user.id, value)
                          }
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Выбрать роль" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
