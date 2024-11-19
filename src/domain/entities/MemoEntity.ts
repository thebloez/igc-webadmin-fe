import {
  IGet,
  IPost,
  IResponseEntity,
  IResponsePaginationEntity,
} from "./ResponseEntity";
import { IBaseState } from "./SharedEntity";

export interface IMemoData {
  id: string;
  identifier: string;
  type: string;
  status: string;
  member_phone_number: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  updated_by: any;
  printed_at: any;
  print_version: number;
  additional_comment: string;
  additional_data: string;
  attributes: {
    id_master: string;
    object_name: string;
    object_image: File | string;
    measurement: string;
    shape: string;
    clarity: string;
    transparency: string;
    cut: string;
    color: string;
    weight: string;
    comments: string;
    origins: string;
  };
}

export interface IMemoTableState extends IBaseState {
  data: IMemoData[];
}
export interface IMemoCreateResponse extends IResponseEntity<IMemoData> {}

export interface IMemoResponse extends IResponsePaginationEntity<IMemoData> {}

export interface IMemoService {
  getAll(props: IGet): Promise<IMemoResponse>;
  createMemo(props: IPost): Promise<IMemoCreateResponse>;
}

export interface IMemoUseCase extends IMemoService {}
