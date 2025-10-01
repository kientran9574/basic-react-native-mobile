import { axiosInstance } from "@/src/api/axios";

const restaurentApi = {
  getRestaurentAPI: (refApi: string) =>
    axiosInstance.post<IBackendBase<IRestaurent[]>>(
      `api/v1/restaurants/${refApi}`
    ),
};
export default restaurentApi;
