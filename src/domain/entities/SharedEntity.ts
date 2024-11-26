export interface IBaseState {
  currentPage: number;
  isLoading: boolean;
  pageSize: number;
  total: number;
}

export interface Attributes {
  id_master: string
  final_identification: string
  object_name: string
  object_image: string
  measurement: any
  shape: string
  clarity: string
  transparency: string
  cut: string
  color: string
  weight: string
  comments: string
  origins: Origins
}

export interface Origins {
  id: number
  name: string
  additional_data: AdditionalData
}

export interface AdditionalData {
  lat: number
  long: number
}

export interface Member {
  mobile_phone: string
  nama: string
}
