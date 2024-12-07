export interface IBaseState {
  currentPage: number;
  isLoading: boolean;
  pageSize: number;
  total: number;
}

export interface Attributes<T = Origins> {
  id_master: string;
  final_identification: string;
  object_name: string;
  object_image: string;
  measurement: string;
  shape: string;
  clarity: string;
  transparency: string;
  cut: string;
  color: string;
  weight: string;
  comments: string;
  origins: T;
}

export interface Origins {
  id: number;
  name: string;
  additional_data: AdditionalData;
}

export interface AdditionalData {
  lat: number;
  long: number;
}

export interface Member {
  mobile_phone: string;
  nama: string;
}

export interface IOption {
  label: string;
  value: string;
}
