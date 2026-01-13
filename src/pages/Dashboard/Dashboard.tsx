import { useState } from "react";
import { UserCard } from "@/components/UserCard";
import { Users, ShieldCheck } from "lucide-react";
import { useGetUsers } from "@/hooks/use-user";
import { useGetRoles } from "@/hooks/use-roles";
import { GridCard } from "./GridCard";
import { Section } from "./Section";
import { Layout } from "../Layout";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const { isLoading: loading, results: users } = useGetUsers({ queryKey: ["users"], params: { limit: 10 } });
  const { data: roles } = useGetRoles({ queryKey: ["roles"], params: { limit: 10 } });

  const statsusers = {
    total: users?.length,
  };

  const statsroles = {
    total: roles?.length,
  };

  const filteredUsers = users?.filter((u) => u.username?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Layout>
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 mb-8">
        <GridCard title="Total Usuarios" stats={statsusers?.total} Icon={Users} />
        <GridCard title="Total de Roles" stats={statsroles?.total} Icon={ShieldCheck} />
      </div>

      {/* Users Section */}
      <Section
        cardtitle={"Usuarios y Roles"}
        carddescription={"Lista de usuarios registrados y sus roles asignados"}
        loading={loading}
        filterdata={filteredUsers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        Icon={ShieldCheck}
        Component={UserCard}
        placeholderNotFound="No se encontraron usuarios"
        placeholderNoData="No hay usuarios registrados"
      />
    </Layout>
  );
}
