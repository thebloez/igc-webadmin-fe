import { Control, FieldErrors } from "react-hook-form";
import { IResponseEntity, IResponsePaginationEntity } from "./ResponseEntity";
import { IBaseState } from "./SharedEntity";
import { ISuggestionsState } from "./SuggestionEntity";
import { ICustomerOption } from "./CustomerEntity";

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
    final_identification: string;
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

export interface IMemoDeleteState {
  visible: boolean;
  isLoading: boolean;
  type: "delete" | "print";
  data: IMemoData;
}

export interface IMemoTableState extends IBaseState {
  data: IMemoData[];
  search: string;
}

export interface IMemoResponse
  extends IResponsePaginationEntity<IMemoData> {}

export interface IMemoCreateResponse
  extends IResponseEntity<IMemoData> {}

export interface IMemoFormProps {
  control: Control<IMemoData, any>;
  errors: FieldErrors<IMemoData>;
  suggestions: ISuggestionsState;
  customers: ICustomerOption;
}
