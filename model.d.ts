/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
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
}
declare module 'axios' {
    export interface AxiosResponse<T = any> extends Promise<T> { }
}
