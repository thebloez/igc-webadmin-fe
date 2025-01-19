import { Control, FieldErrors } from "react-hook-form";
import { IResponseEntity, IResponsePaginationEntity } from "./ResponseEntity";
import { Attributes, IBaseState, IOption, Member } from "./SharedEntity";
import { ISuggestionsState } from "./SuggestionEntity";
import { ICustomerOption } from "./CustomerEntity";

export interface ICertificateData {
  id: string;
  identifier: any;
  type: string;
  status: string;
  member_phone_number: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  isEditable: boolean;
  updated_by: any;
  printed_at: any;
  print_version: number;
  additional_comment: string;
  additional_data: string;
  attributes: Attributes;
  member: Member;
  master: {
    id: string;
    type: string;
  }
}

export interface ICertificateFormData {
  id: string;
  identifier: any;
  type: string;
  status: string;
  member_phone_number: string;
  additional_comment: string;
  additional_data: string;
  attributes: Attributes<string>;
  member: Member;
}

export interface ICertificateModalState {
  visible: boolean;
  isLoading: boolean;
  showWarning?: boolean;
  type: "delete" | "print" | "after-print" | "detail";
  data: ICertificateData;
}

export interface ICertificateTableState extends IBaseState {
  data: ICertificateData[];
  search: string;
}

export interface ICertificateEditState {
  isLoading: boolean;
  id: string;
  error: {
    status: boolean;
    message: string;
  };
}

export interface ICertificateResponsePagination
  extends IResponsePaginationEntity<ICertificateData> {}

  export interface ICertificateResponse extends IResponseEntity<ICertificateData> {}

export interface ICertificateCreateResponse
  extends IResponseEntity<ICertificateData> {}

export interface ICertificateFormProps {
  control: Control<ICertificateFormData, any>;
  errors: FieldErrors<ICertificateFormData>;
  suggestions: ISuggestionsState;
  customers: ICustomerOption;
  onAddNew: (name: string) => void;
  onDelete: (option: IOption, type: string) => void;
}
