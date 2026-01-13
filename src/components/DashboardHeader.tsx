import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

import { LogOut, Users, ShieldCheck } from "lucide-react";
import useAuthContext from "./context/useAuthContext";

export function DashboardHeader() {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();

  const initials = user?.name
    ?.split(" ")
    ?.map((n: string) => n[0])
    ?.join("")
    ?.toUpperCase()
    ?.slice(0, 2);

  return (
    <header className="sticky top-0 z-50 w-full border-b  backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center gap-4">
            <img src="/src/static/imgs/logo.png" alt="XAVIA OAuth" className="h-10 w-auto" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-xavia-cream">
              <span className="text-primary">XAVIA</span> OAuth
            </h1>
            <p className="">Panel de Control</p>
          </div>

          <div className="flex items-center"></div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-primary/30">
                <AvatarFallback className="bg-primary/20 text-primary font-semibold">{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-xs leading-none text-muted-foreground">{user?.name}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/dashboard")} className="gap-2 cursor-pointer">
              <Users className="h-4 w-4" />
              Usuarios
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/roles")} className="gap-2 cursor-pointer">
              <ShieldCheck className="h-4 w-4" />
              Roles
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="gap-2 text-destructive focus:text-destructive cursor-pointer">
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
