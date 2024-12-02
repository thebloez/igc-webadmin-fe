import apiEndpoints, { UpgradeType } from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import {
  IMemoCreateResponse,
  IMemoResponse,
  IMemoResponsePagination,
} from "@domain/entities/MemoEntity";
import {
  IDeleteRequest,
  IGetRequest,
  IPostRequest,
} from "@domain/entities/ResponseEntity";

export interface IMemoService {
  getMemo(props: IGetRequest): Promise<IMemoResponsePagination>;
  findMemo(props: IGetRequest): Promise<IMemoResponse>;
  createMemo(props: IPostRequest<FormData>): Promise<IMemoCreateResponse>;
  upgradeMemo(
    params: {
      id: string;
    },
    props: IPostRequest<FormData>,
    type: UpgradeType
  ): Promise<IMemoCreateResponse>;
  deleteMemo(props: IDeleteRequest): Promise<IMemoResponse>;
  printMemo(props: IGetRequest): Promise<IMemoResponse>;
}

class MemoService implements IMemoService {
  async getMemo(props: IGetRequest): Promise<IMemoResponsePagination> {
    const response: AxiosResponse<IMemoResponsePagination> = await API.get(
      apiEndpoints.master.base,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: {
          type: "Memo",
          ...props.params,
        },
      }
    );

    return response.data;
  }

  async findMemo(props: IGetRequest): Promise<IMemoResponse> {
    const response: AxiosResponse<IMemoResponse> = await API.get(
      apiEndpoints.master.find,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: props.params,
      }
    );

    return response.data;
  }

  async createMemo(
    props: IPostRequest<FormData>
  ): Promise<IMemoCreateResponse> {
    const response: AxiosResponse<IMemoCreateResponse> = await API.post(
      apiEndpoints.master.base,
      props.data,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "Multipart/form-data",
        },
      }
    );

    return response.data;
  }

  async upgradeMemo(
    params: {
      id: string;
    },
    props: IPostRequest<FormData>,
    type: UpgradeType
  ): Promise<IMemoCreateResponse> {
    const response: AxiosResponse<IMemoCreateResponse> = await API.post(
      apiEndpoints.master.upgrade(type),
      props.data,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "Multipart/form-data",
        },
        params: params,
      }
    );

    return response.data;
  }

  async deleteMemo(props: IDeleteRequest): Promise<IMemoResponse> {
    const response: AxiosResponse<IMemoResponse> = await API.delete(
      apiEndpoints.master.delete,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: {
          id: props.id,
        },
      }
    );

    return response.data;
  }

  async printMemo(props: IGetRequest): Promise<IMemoResponse> {
    const response: AxiosResponse<IMemoResponse> = await API.get(
      apiEndpoints.master.print,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: {
          id: props.id,
          identifier: props.params?.identifier,
        },
      }
    );

    return response.data;
  }
}

export default MemoService;
