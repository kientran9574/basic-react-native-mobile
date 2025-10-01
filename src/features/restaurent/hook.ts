import { useMutation } from "@tanstack/react-query";
import restaurentApi from "./api";

export const useRestaurentMutation = () => {
  return useMutation({
    mutationFn: (refApi: string) => restaurentApi.getRestaurentAPI(refApi),
  });
};
