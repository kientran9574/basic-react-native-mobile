import { useMutation, useQuery } from "@tanstack/react-query";
import restaurentApi from "./api";

export const useRestaurentMutation = () => {
  return useMutation({
    mutationFn: (refApi: string) => restaurentApi.getRestaurentAPI(refApi),
  });
};

export const useRestaurentIDQuery = (id: string) => {
  return useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => restaurentApi.getRestaurentId(id),
  });
};
