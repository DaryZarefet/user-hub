import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Search, Loader2, Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { WaveDecoration } from "@/components/WaveDecoration";
import { useGetRoles, useCreateRole, useUpdateRole, useDeleteRole } from "@/hooks/use-roles";
import { GridCard } from "@/components/GridCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import type { Role } from "@/types";

export default function Roles() {
  const { loading: authLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState("");
  const { toast } = useToast();

  const { isLoading, results: roles } = useGetRoles({ queryKey: ["roles"] });
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();

  if (authLoading) {
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

  const filteredRoles = roles?.filter((r) =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = async () => {
    if (!roleName.trim()) return;
    try {
      await createRole.mutateAsync({ name: roleName });
      toast({
        title: "Rol creado",
        description: `El rol "${roleName}" ha sido creado exitosamente.`,
      });
      setRoleName("");
      setIsCreateOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "No se pudo crear el rol.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async () => {
    if (!roleName.trim() || !selectedRole) return;
    try {
      await updateRole.mutateAsync({ id: selectedRole.name, name: roleName });
      toast({
        title: "Rol actualizado",
        description: `El rol ha sido actualizado exitosamente.`,
      });
      setRoleName("");
      setSelectedRole(null);
      setIsEditOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message || "No se pudo actualizar el rol.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedRole) return;
    try {
      await deleteRole.mutateAsync(selectedRole.name);
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
    }
  };

  const openEdit = (role: Role) => {
    setSelectedRole(role);
    setRoleName(role.name);
    setIsEditOpen(true);
  };

  const openDelete = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
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
                    setRoleName("");
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
                <h3 className="text-lg font-medium text-foreground mb-1">
                  {searchTerm ? "No se encontraron roles" : "No hay roles registrados"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm ? "Intenta con otro término de búsqueda" : "Crea un nuevo rol para comenzar"}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredRoles?.map((role) => (
                  <Card
                    key={role.name}
                    className={`p-6 border-0 bg-muted/30 backdrop-blur-sm transition-all hover:shadow-lg ${
                      role.deleted ? "opacity-60" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground capitalize">{role.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {role.deleted ? "Eliminado" : "Activo"}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(role)}
                          className="h-9 w-9 hover:bg-primary/10"
                        >
                          <Pencil className="h-4 w-4 text-primary" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDelete(role)}
                          className="h-9 w-9 hover:bg-destructive/10"
                        >
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
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-card border-0">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Rol</DialogTitle>
            <DialogDescription>Ingresa el nombre del nuevo rol para el sistema.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Nombre del rol"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="bg-background border-input"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreate}
              disabled={createRole.isPending || !roleName.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {createRole.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Crear Rol
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-card border-0">
          <DialogHeader>
            <DialogTitle>Editar Rol</DialogTitle>
            <DialogDescription>Modifica el nombre del rol seleccionado.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Nombre del rol"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="bg-background border-input"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleEdit}
              disabled={updateRole.isPending || !roleName.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              {updateRole.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-card border-0">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar rol?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar el rol "{selectedRole?.name}"? Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteRole.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Wave decoration */}
      <WaveDecoration />

      {/* Footer */}
      <footer className="relative z-10 py-4 text-center text-xavia-cream/60 text-sm mt-8">
        <p>© 2025 XAVIA OAuth. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
