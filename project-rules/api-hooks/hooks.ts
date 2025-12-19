import { useMutation, useQuery } from "@tanstack/react-query";
import { userAPIs, xxxAPIs } from "./api";

export function useUserLogin() {
  return useMutation({
    mutationKey: ["useUserLogin"],
    mutationFn: ({ data }: { data: any }) => {
      return userAPIs.login(data);
    },
  });
}

export function useList() {
  return useQuery({
    staleTime: 2500,
    enabled: true,
    queryKey: ["useList"],
    queryFn: async() => {
      return (await xxxAPIs.search({r:Math.random()})) || [];
    },
  });
}
