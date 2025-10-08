import { axiosInstance } from "@/src/api/axios";

const restaurentApi = {
  getRestaurentAPI: (refApi: string) =>
    axiosInstance.post<IBackendBase<IRestaurent[]>>(
      `api/v1/restaurants/${refApi}`
    ),
  getRestaurentId: (id: string) =>
    axiosInstance.get<IBackendBase<IRestaurent>>(`api/v1/restaurants/${id}`),
};
export default restaurentApi;