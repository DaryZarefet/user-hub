import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { DashboardHeader } from '@/components/DashboardHeader';
import { UserCard } from '@/components/UserCard';
import { RoleBadge } from '@/components/RoleBadge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Users, ShieldCheck, Shield, User as UserIcon, Search, Loader2 } from 'lucide-react';
import { WaveDecoration } from '@/components/WaveDecoration';

interface UserWithRoles {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  roles: Array<'admin' | 'moderator' | 'user'>;
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    async function fetchUsers() {
      if (!user) return;

      try {
        // Fetch profiles
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('*');

        if (profilesError) throw profilesError;

        // Fetch roles
        const { data: roles, error: rolesError } = await supabase
          .from('user_roles')
          .select('*');

        if (rolesError) throw rolesError;

        // Combine profiles with roles
        const usersWithRoles: UserWithRoles[] = (profiles || []).map((profile) => {
          const userRoles = (roles || [])
            .filter((r) => r.user_id === profile.user_id)
            .map((r) => r.role as 'admin' | 'moderator' | 'user');

          return {
            id: profile.user_id,
            email: profile.email,
            full_name: profile.full_name,
            avatar_url: profile.avatar_url,
            created_at: profile.created_at,
            roles: userRoles.length > 0 ? userRoles : ['user'],
          };
        });

        setUsers(usersWithRoles);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchUsers();
    }
  }, [user]);

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.full_name && u.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.roles.includes('admin')).length,
    moderators: users.filter((u) => u.roles.includes('moderator')).length,
    regularUsers: users.filter((u) => u.roles.includes('user') && !u.roles.includes('admin') && !u.roles.includes('moderator')).length,
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-xavia-brown">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-xavia-brown relative overflow-hidden">
      <DashboardHeader />

      <main className="container px-4 py-8 relative z-10">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-0 bg-card/95 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Usuarios
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/95 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Administradores
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-role-admin/10 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 text-role-admin" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-role-admin">{stats.admins}</div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/95 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Moderadores
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-role-moderator/10 flex items-center justify-center">
                <Shield className="h-4 w-4 text-role-moderator" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-role-moderator">{stats.moderators}</div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/95 backdrop-blur-sm shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Usuarios
              </CardTitle>
              <div className="h-8 w-8 rounded-lg bg-role-user/10 flex items-center justify-center">
                <UserIcon className="h-4 w-4 text-role-user" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-role-user">{stats.regularUsers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Users Section */}
        <Card className="border-0 bg-card/95 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl text-foreground">Usuarios y Roles</CardTitle>
                <CardDescription>
                  Lista de usuarios registrados y sus roles asignados
                </CardDescription>
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
            {loading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
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
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  {searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm
                    ? 'Intenta con otro término de búsqueda'
                    : 'Los usuarios aparecerán aquí cuando se registren'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredUsers.map((userItem) => (
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
            <CardDescription>
              Descripción de los roles disponibles en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-role-admin/5 border border-role-admin/20">
                <RoleBadge role="admin" />
                <p className="text-sm text-muted-foreground">
                  Acceso completo al sistema. Puede gestionar usuarios y roles.
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-role-moderator/5 border border-role-moderator/20">
                <RoleBadge role="moderator" />
                <p className="text-sm text-muted-foreground">
                  Puede moderar contenido y ver información de usuarios.
                </p>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-role-user/5 border border-role-user/20">
                <RoleBadge role="user" />
                <p className="text-sm text-muted-foreground">
                  Acceso básico al sistema. Rol asignado por defecto.
                </p>
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
