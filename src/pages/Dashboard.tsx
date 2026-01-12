import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { DashboardHeader } from "@/components/DashboardHeader";
import { UserCard } from "@/components/UserCard";
import { RoleBadge } from "@/components/RoleBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, ShieldCheck, Shield, User as UserIcon, Search, Loader2, Grid } from "lucide-react";
import { WaveDecoration } from "@/components/WaveDecoration";
import { useGetUsers } from "@/hooks/use-user";
import { User } from "@/types";
import { GridCard } from "@/components/GridCard";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-xavia-brown">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { isLoading, results: users } = useGetUsers({ queryKey: ["users"], params: { limit: 10 } });

  const stats = {
    total: users?.length,
    admins: users?.filter((u) => u.roles.includes("admin"))?.length,
    moderators: users?.filter((u) => u.roles.includes("moderator"))?.length,
    regularUsers: users?.filter((u) => u.roles.includes("user") && !u.roles.includes("admin") && !u.roles.includes("moderator"))?.length,
  };

  const filteredUsers = users?.filter((u) => u.username?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DashboardHeader />

      <main className="container px-4 py-8 relative z-10">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <GridCard title="Total Usuarios" stats={stats?.total} Icon={Users} />
          <GridCard title="Administradores" stats={stats?.admins} Icon={ShieldCheck} />
          <GridCard title="Moderadores" stats={stats?.moderators} Icon={Shield} />
          <GridCard title="Usuarios" stats={stats?.regularUsers} Icon={UserIcon} />
        </div>

        {/* Users Section */}
        <Card className="border-0 bg-card/95 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl text-foreground">Usuarios y Roles</CardTitle>
                <CardDescription>Lista de usuarios registrados y sus roles asignados</CardDescription>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-input"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3]?.map((i) => (
                  <Card key={i} className="p-6 bg-muted/50">
                    <div className="flex items-start gap-4">
                      <Skeleton className="h-14 w-14 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredUsers?.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">{searchTerm ? "No se encontraron usuarios" : "No hay usuarios registrados"}</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Intenta con otro término de búsqueda" : "Los usuarios aparecerán aquí cuando se registren"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers?.map((userItem) => (
                  <UserCard key={userItem.id} user={userItem} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Role Legend */}
        <Card className="mt-8 border-0 bg-card/95 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Tipos de Roles</CardTitle>
            <CardDescription>Descripción de los roles disponibles en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-role-admin/5 border border-role-admin/20">
                <RoleBadge role="admin" />
                <p className="text-sm text-muted-foreground">Acceso completo al sistema. Puede gestionar usuarios y roles.</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-role-moderator/5 border border-role-moderator/20">
                <RoleBadge role="moderator" />
                <p className="text-sm text-muted-foreground">Puede moderar contenido y ver información de usuarios.</p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-role-user/5 border border-role-user/20">
                <RoleBadge role="user" />
                <p className="text-sm text-muted-foreground">Acceso básico al sistema. Rol asignado por defecto.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Wave decoration */}
      <WaveDecoration />

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xavia-cream/60 text-sm mt-8">
        <p>© 2025 XAVIA OAuth. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
