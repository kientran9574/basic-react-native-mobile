import { axiosInstance } from "@/src/api/axios";

const apiMe = {
  getMe: () => axiosInstance.get("/api/v1/auth/account"),
};
export default apiMe;
