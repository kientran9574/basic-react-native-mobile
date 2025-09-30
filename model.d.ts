import "axios";
export {};
declare global {
  // global không cần import
  // generic type lấy type động
  interface IBackendBase<T> {
    statusCode: number;
    error?: string | string[];
    message: string | string[];
    data?: T;
  }
  interface IRegister {
    id?: string;
  }
  interface IUserLogin {
    user: {
      email: string;
      _id: string;
      name: string;
      role: string;
      address: any;
      avatar: string;
      phone: string;
    };
    access_token: string;
  }
}
declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}
