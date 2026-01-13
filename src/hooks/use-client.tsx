import { useMutation, useQuery } from "@tanstack/react-query";
import { apiServer } from "./apiServer";

export function useGetClients({ queryKey, params }) {
  const { data, isPending, isFetching, isError, error, refetch, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await apiServer.get("/api/v1/clients", { params }).then((r) => r.data),
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

export function useCreateClient() {
  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const { data: response } = await apiServer.post("/api/v1/clients/", data).then((r) => r.data);
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

export function useUpdateClient() {
  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: async (data) => {
      const { data: response } = await apiServer.put("/api/v1/clients/", data).then((r) => r.data);
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

export function useDeleteClient() {
  const { data, isPending, isError, error, mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data: response } = await apiServer.delete(`/api/v1/clients/${id}`).then((r) => r.data);
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
