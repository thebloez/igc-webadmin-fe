import { IResponsePaginationEntity } from "./ResponseEntity";
import { IBaseState, IOption } from "./SharedEntity";

export interface ICustomerData {
  mobile_phone: string;
  nama: string;
}

export interface ICustomerTableState extends IBaseState {
  data: ICustomerData[];
}

export interface ICustomerOption {
  isLoading: boolean;
  data: IOption[];
}

export interface ICustomerResponse
  extends IResponsePaginationEntity<ICustomerData> {}
