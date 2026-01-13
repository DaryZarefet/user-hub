import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiServer } from "./apiServer";
import type { Role } from "../types";

export function useGetRoles({ queryKey, params }: { queryKey: string[]; params?: Record<string, any> }) {
  const { data, isPending, isFetching, isError, error, refetch, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await apiServer.get("/api/v1/roles", { params }).then((r) => r.data),
  });

  return {
    data,
    results: data?._embedded?.roles as Role[] | undefined,
    isPending,
    isFetching,
    isError,
    isLoading,
    error,
    refetch,
  };
}

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (role: { name: string }) => {
      const response = await apiServer.post("/api/v1/roles", role);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const response = await apiServer.put(`/api/v1/roles/${id}`, { name });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiServer.delete(`/api/v1/roles/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
}
