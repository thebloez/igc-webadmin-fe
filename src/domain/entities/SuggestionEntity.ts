import { IResponseEntity } from "./ResponseEntity";

interface ISuggest {
  value: string;
  label: string;
}

interface ISuggestionData {
  clarity: ISuggest[];
  color: ISuggest[];
  comment: ISuggest[];
  cut: ISuggest[];
  final_identification: ISuggest[];
  origin: ISuggest[];
  shape: ISuggest[];
  transparency: ISuggest[];
}

export interface ISuggestionFormData {
  phone_number: string;
  name: string;
  clarity: string;
  color: string;
  comment: string;
  cut: string;
  final_identification: string;
  origin: string;
  shape: string;
  transparency: string;
}

export interface ISuggestionModalState {
  visible: boolean;
  type:
    | "customer"
    | "final_identification"
    | "cut"
    | "shape"
    | "color"
    | "comment"
    | "origin"
    | "clarity"
    | "transparency";
}

export interface ISuggestionsState {
  isLoading: boolean;
  data: ISuggestionData;
}

export interface ISuggestionResponse extends IResponseEntity<ISuggestionData> {}
