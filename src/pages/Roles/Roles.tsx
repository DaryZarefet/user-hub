import { useEffect, useMemo, useState } from "react";
import { Shield, X, Check, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCreateRole, useDeleteRole, useGetRoles, useUpdateRole } from "@/hooks/use-roles";
import { CreateRole } from "./CreateRole";
import { EditRole } from "./EditRole";
import { DeletedRole } from "./DeletedRole";
import { GridCard } from "../Dashboard/GridCard";
import { Layout } from "../Layout";
import { Section } from "../Dashboard/Section";
import { RoleCard } from "./RoleCard";

import type { Role } from "@/types";

export default function Roles() {
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  const { isLoading, data: roles, refetch } = useGetRoles({ queryKey: ["roles"], params: { page: page, size: pageSize, sort: sortOrder } });
  const { mutateAsync: createRole } = useCreateRole();
  const { mutateAsync: updateRole } = useUpdateRole();
  const { mutateAsync: deleteRole } = useDeleteRole();

  const [loading, setLoading] = useState(false);

  const stats = {
    total: roles?.length ?? 0,
    active: roles?.filter((r) => !r.deleted)?.length ?? 0,
    deleted: roles?.filter((r) => r.deleted)?.length ?? 0,
  };

  const filteredRoles = useMemo(() => {
    if (!roles) return [];
    const q = searchTerm?.trim().toLowerCase();
    if (!q) return roles;
    return roles.filter((r) => (r.name ?? "").toLowerCase().includes(q));
  }, [roles, searchTerm]);

  const sortedRoles = useMemo(() => {
    const arr = [...(filteredRoles ?? [])];
    arr.sort((a, b) => {
      const an = (a.name ?? "").toLowerCase();
      const bn = (b.name ?? "").toLowerCase();
      if (an < bn) return sortOrder === "asc" ? -1 : 1;
      if (an > bn) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filteredRoles, sortOrder]);

  const totalPages = Math.max(1, Math.ceil((sortedRoles?.length ?? 0) / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, pageSize, sortOrder]);

  const paginatedRoles = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sortedRoles.slice(start, end);
  }, [sortedRoles, page, pageSize]);

  const handleCreate = async () => {
    if (!role?.name || !role.name.trim()) {
      toast({ title: "Error", description: "El nombre del rol es requerido.", variant: "destructive" });
      return;
    }

    if (role?.name?.length < 3) {
      toast({ title: "Error", description: "El nombre del rol debe tener al menos 3 caracteres.", variant: "destructive" });
      return;
    }

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/u;
    if (!nameRegex.test(role?.name)) {
      toast({
        title: "Error",
        description: "El nombre del rol solo puede contener letras y espacios.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await createRole({ name: role.name.trim(), deleted: false });
      toast({ title: "Rol creado", description: `El rol "${role.name}" ha sido creado exitosamente.` });
      setRole({ name: "", deleted: false } as any);
      setIsCreateOpen(false);
      await refetch();
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
    if (!selectedRole) {
      toast({ title: "Error", description: "No hay rol seleccionado para editar.", variant: "destructive" });
      return;
    }
    if (!role?.name || !role.name.trim()) {
      toast({ title: "Error", description: "El nombre del rol es requerido.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await updateRole({ id: selectedRole.id, name: role.name.trim(), deleted: !!role.deleted });
      toast({ title: "Rol actualizado", description: `El rol ha sido actualizado exitosamente.` });
      setRole(role);
      setSelectedRole(null);
      setIsEditOpen(false);
      await refetch();
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
    if (!selectedRole) {
      toast({ title: "Error", description: "No hay rol seleccionado para eliminar.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const identifier = (selectedRole.id ?? selectedRole.name) as any;
      await deleteRole(identifier);
      toast({ title: "Rol eliminado", description: `El rol "${selectedRole.name}" ha sido eliminado.` });
      setSelectedRole(null);
      setIsDeleteOpen(false);
      await refetch();
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
      </div>

      {/* Roles Section */}
      <Section
        cardtitle={"Roles y Permisos"}
        carddescription={"Lista de roles y permisos del sistema"}
        loading={isLoading}
        filterdata={paginatedRoles}
        totalItems={sortedRoles.length}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
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
