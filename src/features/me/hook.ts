import { useQuery } from "@tanstack/react-query";
import apiMe from "./api";

export const useMeQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => apiMe.getMe(),
  });
};
