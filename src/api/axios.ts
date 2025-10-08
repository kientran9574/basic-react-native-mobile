import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // đặt trong app config
  timeout: 15_000, // RN mạng di động dễ chậm
});

// Token lưu ở đâu?
// - Nếu dùng SecureStore/AsyncStorage: inject khi tạo request
// - Có thể truyền qua closure hoặc 1 tokenStore module
let accessToken: string | null = null;
// export const setAccessToken = (token: string | null) => {
//   accessToken = token;
// };

// REQUEST interceptor: đính kèm Authorization + AbortController
axiosInstance.interceptors.request.use(async (config: any) => {
  // config.headers["delay"] = 3000;
  accessToken = await AsyncStorage.getItem("access_token");
  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  // Axios v1 hỗ trợ AbortController.signal — React Query sẽ truyền signal vào hàm fetcher, ta gắn vào config ở nơi gọi.
  return config;
});

// RESPONSE interceptor: chuẩn hoá lỗi, auto refresh token (nếu có logic)
axiosInstance.interceptors.response.use(
  (res) => {
    // can thiệp khi backend trả data cho client thì mình can thiệp vào lúc
    // backend trả ra thì mình chuẩn hóa lại trả ra json tinh gọn lại
    if (res && res.data) return res.data;
    return res;
  },
  async (error: AxiosError) => {
    // can thiệp khi backend trả error cho client thì mình can thiệp vào lúc
    // backend trả ra lỗi
    // Nếu có lỗi trả ra thì nó rơi vào đoạn điều kiện else
    if (error && error.response?.data) return error.response.data;
    // Ví dụ: nếu 401 -> thử refresh, sau đó retry 1 lần (viết rút gọn)
    if (error.response?.status === 401) {
      // TODO: gọi refresh token API nếu bạn có
      // Nếu refresh thành công: setAccessToken(newToken); retry request cũ
      // Nếu thất bại: logout
    }
    // chuẩn hoá object Error để layer trên dễ hiển thị
    // nó sẽ rơi vào đoạn catch dành cho Promise, try/catch
    return Promise.reject(error);
  }
);
