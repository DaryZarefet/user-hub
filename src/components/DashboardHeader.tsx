import { useAuth } from "@/hooks/useAuth";
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
import { LogOut, User, Users, Shield } from "lucide-react";
import { XaviaLogo } from "@/components/XaviaLogo";
import { NavLink } from "@/components/NavLink";

export function DashboardHeader() {
  const { user } = useAuth();

  const initials = user?.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "U";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-xavia-cream/10 bg-xavia-brown/95 backdrop-blur supports-[backdrop-filter]:bg-xavia-brown/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <XaviaLogo size="sm" showText={false} />
            <div>
              <h1 className="text-lg font-bold text-xavia-cream">
                <span className="text-primary">XAVIA</span> OAuth
              </h1>
              <p className="text-xs text-xavia-cream/60">Panel de Control</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            <NavLink to="/dashboard">
              <Users className="h-4 w-4 mr-2 inline" />
              Usuarios
            </NavLink>
            <NavLink to="/roles">
              <Shield className="h-4 w-4 mr-2 inline" />
              Roles
            </NavLink>
          </nav>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-xavia-cream/10">
              <Avatar className="h-10 w-10 border-2 border-primary/30">
                <AvatarFallback className="bg-primary/20 text-primary font-semibold">{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-card border-border" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-foreground">{user?.name || "Usuario"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.username}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="h-4 w-4" />
              Mi Perfil
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive cursor-pointer md:hidden">
              <Users className="h-4 w-4" />
              Usuarios
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive cursor-pointer md:hidden">
              <Shield className="h-4 w-4" />
              Roles
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
