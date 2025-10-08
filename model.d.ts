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
  interface IRestaurent {
    _id: string;
    name: string;
    phone: string;
    address: string;
    email: string;
    rating: number;
    image: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    menu: IMenu[];
  }
  interface IMenu {
    _id: string;
    restaurant: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    menuItem: IMenuItem[];
  }
  interface IMenuItem {
    _id: string;
    menu: string;
    title: string;
    description: string;
    basePrice: number;
    image: string;
    options: {
      title: string;
      description: string;
      additionalPrice: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }
}
declare module "axios" {
  export interface AxiosResponse<T = any> extends Promise<T> {}
}
