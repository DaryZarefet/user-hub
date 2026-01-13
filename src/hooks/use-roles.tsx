import { useMutation, useQuery } from "@tanstack/react-query";
import { apiServer } from "./apiServer";
import type { Role } from "@/types";

export function useGetRoles({ queryKey, params }) {
  const { data, isPending, isFetching, isError, error, refetch, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await apiServer.get("/api/v1/roles", { params }).then((r) => r.data),
  });

  return {
    data,
    isPending,
    isFetching,
    isError,
    isLoading,
    error,
    refetch,
  };
}

export function useCreateRole() {
  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: async (data: Role) => {
      const { data: response } = await apiServer.post("/api/v1/roles/", data).then((r) => r.data);
      return response;
    },
  });

  return {
    data,
    isPending,
    isError,
    error,
    mutateAsync,
  };
}

export function useUpdateRole() {
  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: async (data: Role) => {
      const { data: response } = await apiServer.put("/api/v1/roles/", data).then((r) => r.data);
      return response;
    },
  });

  return {
    data,
    isPending,
    isError,
    error,
    mutateAsync,
  };
}

export function useDeleteRole() {
  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: async (id: number | string) => {
      const { data: response } = await apiServer.delete(`/api/v1/roles/${id}`).then((r) => r.data);
      return response;
    },
  });

  return {
    data,
    isPending,
    isError,
    error,
    mutateAsync,
  };
}
