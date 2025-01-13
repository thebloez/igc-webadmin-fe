import { Control, FieldErrors } from "react-hook-form";
import { IResponseEntity, IResponsePaginationEntity } from "./ResponseEntity";
import { Attributes, IBaseState, Member } from "./SharedEntity";
import { ISuggestionsState } from "./SuggestionEntity";
import { ICustomerOption } from "./CustomerEntity";

export interface IMemoData {
  id: string;
  identifier: string;
  type: string;
  status: string;
  isEditable: boolean;
  member_phone_number: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  updated_by: any;
  printed_at: any;
  print_version: number;
  additional_comment: string;
  additional_data: string;
  attributes: Attributes;
  member: Member;
}

export interface IMemoFormData {
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

export interface IMemoModalState {
  visible: boolean;
  isLoading: boolean;
  type: "delete" | "print" | "upgrade" | "after-print" | "detail";
  data: IMemoData;
  showWarning?: boolean;
}

export interface IMemoTableState extends IBaseState {
  data: IMemoData[];
  search: string;
}

export interface IMemoUpgradeState {
  isLoading: boolean;
  id: string;
  error: {
    status: boolean;
    message: string;
  };
}

export interface IMemoResponsePagination
  extends IResponsePaginationEntity<IMemoData> {}

export interface IMemoResponse extends IResponseEntity<IMemoData> {}

export interface IMemoCreateResponse extends IResponseEntity<IMemoData> {}

export interface IMemoFormProps {
  control: Control<IMemoData, any>;
  errors: FieldErrors<IMemoData>;
  suggestions: ISuggestionsState;
  customers: ICustomerOption;
}
