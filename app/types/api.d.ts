export interface IAPIOption {
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  data?: any;
  headers?: any;
  body?: any;
  params?: any; // Add this line
}

export interface IResponse<T> {
  data: T;
}