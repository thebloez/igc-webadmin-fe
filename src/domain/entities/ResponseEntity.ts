// types/http/status.ts
export enum HttpStatusCode {
  OK = "200",
  CREATED = "201",
  BAD_REQUEST = "400",
  UNAUTHORIZED = "401",
  FORBIDDEN = "403",
  NOT_FOUND = "404",
  INTERNAL_SERVER_ERROR = "500",
}

// types/common/meta.ts
export interface IMeta {
  code: HttpStatusCode;
  message: string;
}

export interface IPagination {
  page: number;
  total: number;
  limit: number;
}

export interface IMetaPagination extends IMeta {
  pagination: IPagination;
}

// types/http/request.ts
export interface IBaseRequest {
  token: string;
}

export interface IGetRequest extends IBaseRequest {
  params?: {
    page?: number;
    per_page?: number;
  };
}

export interface IPostRequest<T> extends IBaseRequest {
  data: T;
}

export interface IDeleteRequest extends IBaseRequest {
  id: string;
}

// types/http/response.ts
export interface IResponseEntity<T> {
  meta: IMeta;
  data: T;
}

export interface IResponsePaginationEntity<T> {
  meta: IMetaPagination;
  data: T[];
}
