import { Control, FieldErrors } from "react-hook-form";
import { IResponseEntity, IResponsePaginationEntity } from "./ResponseEntity";
import { IBaseState } from "./SharedEntity";
import { ISuggestionsState } from "./SuggestionEntity";
import { ICustomerOption } from "./CustomerEntity";

export interface ITrashData {
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

export interface ITrashTableState extends IBaseState {
  data: ITrashData[];
  search: string;
}

export interface ITrashResponse extends IResponsePaginationEntity<ITrashData> {}

export interface ITrashCreateResponse extends IResponseEntity<ITrashData> {}

export interface ITrashFormProps {
  control: Control<ITrashData, any>;
  onSubmit: () => void;
  isFormLoading: boolean;
  onReset: () => void;
  errors: FieldErrors<ITrashData>;
  suggestions: ISuggestionsState;
  customers: ICustomerOption;
}

export interface ITrashModalState {
  visible: boolean;
  isLoading: boolean;
  id: string;
  type: "restore" | "destroy";
}
