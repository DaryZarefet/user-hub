import { useQuery } from "@tanstack/react-query";
import { apiServer } from "./apiServer";

export function useGetUsers({ queryKey, params }) {
  const { data, isPending, isFetching, isError, error, refetch, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await apiServer.get("/api/v1/roles", { params: params }).then((r) => r.data),
  });

  return {
    data,
    results: data?._embedded?.roles,
    isPending,
    isFetching,
    isError,
    isLoading,
    error,
    refetch,
  };
}
