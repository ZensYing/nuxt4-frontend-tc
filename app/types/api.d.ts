export interface IAPIOption {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  data?: any;
  headers?: any;
  body?: any;
}

export interface IResponse<T> {
  data: T;
}