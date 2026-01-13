import { useState } from "react";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Client } from "@/types";
import { useGetClients, useCreateClient, useUpdateClient, useDeleteClient } from "@/hooks/use-client";
import { GridCard } from "../Dashboard/GridCard";
import { Layout } from "../Layout";
import { Section } from "../Dashboard/Section";
import { ClientCard } from "./ClientCard";

export default function Clients() {
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [client, setClient] = useState<Client>(null);

  const { isLoading, data: clients } = useGetClients({ queryKey: ["clients"], params: { limit: 100 } });
  const { mutateAsync: createClient } = useCreateClient();
  const { mutateAsync: updateClient } = useUpdateClient();
  const { mutateAsync: deleteClient } = useDeleteClient();

  const [loading, setLoading] = useState(false);

  const stats = {
    total: clients?.length ?? 0,
    active: clients?.filter((r) => !r.deleted)?.length ?? 0,
    deleted: clients?.filter((r) => r.deleted)?.length ?? 0,
  };

  const filteredClients = clients?.filter((r) => r.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCreate = async () => {
    setLoading(true);
    try {
      //   await createClient({ name: client?.name, deleted: true });
      toast({
        title: "Rol creado",
        description: `El rol "${client?.name}" ha sido creado exitosamente.`,
      });
      //   setClient({ name: "", deleted: false });
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
      //   await updateClient({ id: selectedClient.id, name: client.name, deleted: client.deleted });
      toast({
        title: "Rol actualizado",
        description: `El rol ha sido actualizado exitosamente.`,
      });
      setClient(client);
      setSelectedClient(null);
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
      //   await deleteClient(selectedClient.name);
      toast({
        title: "Rol eliminado",
        description: `El rol "${selectedClient.name}" ha sido eliminado.`,
      });
      setSelectedClient(null);
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

  const openEdit = (client: Client) => {
    setSelectedClient(client);
    setClient(client);
    setIsEditOpen(true);
  };

  const openDelete = (client: Client) => {
    setSelectedClient(client);
    setIsDeleteOpen(true);
  };

  return (
    <Layout>
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <GridCard title="Total de Clientes" stats={stats.total} Icon={Users} />
      </div>

      {/* Roles Section */}
      <Section
        cardtitle={"Clientes"}
        carddescription={"Lista de clientes en el sistema"}
        loading={isLoading}
        filterdata={filteredClients}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        Icon={Users}
        Component={ClientCard}
        placeholderNotFound="No se encontraron clientes"
        placeholderNoData="No hay clientes registrados"
        setObj={setClient}
        setIsCreateOpen={setIsCreateOpen}
        openEdit={openEdit}
        openDelete={openDelete}
      />

      {/* Create Dialog */}
      {/* <CreateRole
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
        client={client}
        setClient={setClient}
        loading={loading}
        handleCreate={handleCreate}
      /> */}

      {/* Edit Dialog */}
      {/* <EditRole isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} client={client} setClient={setClient} loading={loading} handleEdit={handleEdit} /> */}

      {/* Delete Dialog */}
      {/* <DeletedRole
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        selectedClient={selectedClient}
        openDelete={openDelete}
        loading={loading}
        handleDelete={handleDelete}
      /> */}
    </Layout>
  );
}
