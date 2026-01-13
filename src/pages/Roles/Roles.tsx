import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Search, Loader2, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { WaveDecoration } from "@/components/WaveDecoration";

import { useToast } from "@/hooks/use-toast";
import type { Role } from "@/types";
import { useCreateRole, useDeleteRole, useGetRoles, useUpdateRole } from "@/hooks/use-roles";
import { CreateRole } from "./CreateRole";
import { EditRole } from "./EditRole";
import { DeletedRole } from "./DeletedRole";
import { GridCard } from "../Dashboard/GridCard";

export default function Roles() {
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [role, setRole] = useState<Role>(null);

  const { isLoading, data: roles } = useGetRoles({ queryKey: ["roles"], params: { limit: 100 } });
  const { mutateAsync: createRole } = useCreateRole();
  const { mutateAsync: updateRole } = useUpdateRole();
  const { mutateAsync: deleteRole } = useDeleteRole();

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-xavia-brown">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = {
    total: roles?.length ?? 0,
    active: roles?.filter((r) => !r.deleted)?.length ?? 0,
    deleted: roles?.filter((r) => r.deleted)?.length ?? 0,
  };

  const filteredRoles = roles?.filter((r) => r.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createRole({ name: role?.name, deleted: true });
      toast({
        title: "Rol creado",
        description: `El rol "${role?.name}" ha sido creado exitosamente.`,
      });
      setRole({ name: "", deleted: false });
      setIsCreateOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "No se pudo crear el rol.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      await updateRole({ id: selectedRole.id, name: role.name, deleted: role.deleted });
      toast({
        title: "Rol actualizado",
        description: `El rol ha sido actualizado exitosamente.`,
      });
      setRole(role);
      setSelectedRole(null);
      setIsEditOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "No se pudo actualizar el rol.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteRole(selectedRole.name);
      toast({
        title: "Rol eliminado",
        description: `El rol "${selectedRole.name}" ha sido eliminado.`,
      });
      setSelectedRole(null);
      setIsDeleteOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "No se pudo eliminar el rol.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (role: Role) => {
    setSelectedRole(role);
    setRole(role);
    setIsEditOpen(true);
  };

  const openDelete = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[url('/src/static/imgs/water.png')] bg-cover bg-center">
      <DashboardHeader />

      <main className="container px-4 py-8 relative z-10">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <GridCard title="Total Roles" stats={stats.total} Icon={Shield} />
          <GridCard title="Roles Activos" stats={stats.active} Icon={Check} />
          <GridCard title="Roles Eliminados" stats={stats.deleted} Icon={X} />
        </div>

        {/* Roles Section */}
        <Card className="border-0 bg-card/95 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl text-foreground">Gestión de Roles</CardTitle>
                <CardDescription>Crear, editar y eliminar roles del sistema</CardDescription>
              </div>
              <div className="flex gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar roles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-input"
                  />
                </div>
                <Button
                  onClick={() => {
                    setRole(null);
                    setIsCreateOpen(true);
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Rol
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="p-6 bg-muted/50">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-lg" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredRoles?.length === 0 ? (
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">{searchTerm ? "No se encontraron roles" : "No hay roles registrados"}</h3>
                <p className="text-sm text-muted-foreground">{searchTerm ? "Intenta con otro término de búsqueda" : "Crea un nuevo rol para comenzar"}</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredRoles?.map((role) => (
                  <Card
                    key={role.name}
                    className={`p-6 border-0 bg-muted/30 backdrop-blur-sm transition-all hover:shadow-lg ${role.deleted ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground capitalize">{role.name}</h3>
                          <p className="text-sm text-muted-foreground">{role.deleted ? "Eliminado" : "Activo"}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(role)} className="h-9 w-9 hover:bg-primary/10">
                          <Pencil className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDelete(role)} className="h-9 w-9 hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Create Dialog */}
      <CreateRole isCreateOpen={isCreateOpen} setIsCreateOpen={setIsCreateOpen} role={role} setRole={setRole} loading={loading} handleCreate={handleCreate} />

      {/* Edit Dialog */}
      <EditRole isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} role={role} setRole={setRole} loading={loading} handleEdit={handleEdit} />

      {/* Delete Dialog */}
      <DeletedRole
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        selectedRole={selectedRole}
        openDelete={openDelete}
        loading={loading}
        handleDelete={handleDelete}
      />

      {/* Wave decoration */}
      <WaveDecoration />

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xavia-cream/60 text-sm mt-8">
        <p>© 2025 XAVIA OAuth. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
