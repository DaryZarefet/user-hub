import { useState } from "react";
import { Shield, Loader2, X, Check, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Role } from "@/types";
import { useCreateRole, useDeleteRole, useGetRoles, useUpdateRole } from "@/hooks/use-roles";
import { CreateRole } from "./CreateRole";
import { EditRole } from "./EditRole";
import { DeletedRole } from "./DeletedRole";
import { GridCard } from "../Dashboard/GridCard";
import { Layout } from "../Layout";
import { Section } from "../Dashboard/Section";
import { RoleCard } from "./RoleCard";

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
    <Layout>
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <GridCard title="Total Roles" stats={stats.total} Icon={Shield} />
        <GridCard title="Roles Activos" stats={stats.active} Icon={Check} />
        <GridCard title="Roles Eliminados" stats={stats.deleted} Icon={X} />
      </div>

      {/* Roles Section */}
      <Section
        cardtitle={"Roles y Permisos"}
        carddescription={"Lista de roles y permisos del sistema"}
        loading={isLoading}
        filterdata={filteredRoles}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        Icon={ShieldCheck}
        Component={RoleCard}
        placeholderNotFound="No se encontraron roles"
        placeholderNoData="No hay roles registrados"
        setObj={setRole}
        setIsCreateOpen={setIsCreateOpen}
        openEdit={openEdit}
        openDelete={openDelete}
      />

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
    </Layout>
  );
}
