import { useQuery } from "@tanstack/react-query";
import { apiServer } from "./apiServer";

export function useGetUsers({ queryKey, params }) {
  const { data, isPending, isFetching, isError, error, refetch, isLoading } = useQuery({
    queryKey,
    queryFn: async () => await apiServer.get("/api/v1/users", { params: params }).then((r) => r.data),
  });

  return {
    data,
    results: data?._embedded?.users,
    isPending,
    isFetching,
    isError,
    isLoading,
    error,
    refetch,
  };
}

// export function useGetById({ queryKey, serverUrl, id, params }) {
//   const { data, isPending, isFetching, isError, error, refetch, isLoading } = useQuery({
//     queryKey,
//     queryFn: () => apiServer.get(joinUrl(serverUrl, id), { params: params }).then((r) => r.data),
//     enabled: !!id,
//   });

//   return {
//     data,
//     results: data?.results,
//     isPending,
//     isLoading,
//     isFetching,
//     isError,
//     error,
//     refetch,
//   };
// }

// export function useCreate({ serverUrl }) {
//   const { mutate, mutateAsync, isLoading, isError, error } = useMutation({
//     mutationFn: async (payload) => {
//       const res = await apiServer.post(serverUrl, payload);
//       return res.data;
//     },
//   });

//   return {
//     create: mutate,
//     createAsync: mutateAsync,
//     isCreating: isLoading,
//     createError: isError ? error : null,
//     ...mutate,
//   };
// }

// export function useUpdate({ serverUrl }) {
//   const { mutate, mutateAsync, isLoading, isError, error } = useMutation({
//     mutationFn: async ({ id, payload }) => {
//       const url = joinUrl(serverUrl, id);
//       const res = await apiServer.patch(url, payload);
//       return res.data;
//     },
//   });

//   return {
//     update: mutate,
//     updateAsync: mutateAsync,
//     isUpdating: isLoading,
//     updateError: isError ? error : null,
//     ...mutate,
//   };
// }

// export function useDelete({ serverUrl }) {
//   const { mutate, mutateAsync, isLoading, isError, error } = useMutation({
//     mutationFn: async (id) => {
//       const url = joinUrl(serverUrl, id);
//       const res = await apiServer.delete(url);
//       return res.data;
//     },
//   });

//   return {
//     remove: mutate,
//     removeAsync: mutateAsync,
//     isDeleting: isLoading,
//     deleteError: isError ? error : null,
//     ...mutate,
//   };
// }
