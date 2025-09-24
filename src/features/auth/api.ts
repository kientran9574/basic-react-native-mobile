import { axiosInstance } from "@/src/api/axios";
import { IVerify } from "@/src/types/auth.types";

const authApi = {
  signUp: (payload: any) =>
    axiosInstance.post<IBackendBase<IRegister>>(
      "/api/v1/auth/register",
      payload
    ),
  signIn: (payload: any) => axiosInstance.post("/api/v1/auth/login", payload),
  verify: (payload: IVerify) =>
    axiosInstance.post("/api/v1/auth/verify-code", payload),
  resendCode: (payload: any) =>
    axiosInstance.post("/api/v1/auth/verify-email", payload),
};
export default authApi;
