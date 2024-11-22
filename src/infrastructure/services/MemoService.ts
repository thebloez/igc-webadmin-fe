import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import {
  IMemoCreateResponse,
  IMemoResponse,
} from "@domain/entities/MemoEntity";
import {
  IDeleteRequest,
  IGetRequest,
  IPostRequest,
} from "@domain/entities/ResponseEntity";

export interface IMemoService {
  getMemo(props: IGetRequest): Promise<IMemoResponse>;
  createMemo(props: IPostRequest<FormData>): Promise<IMemoCreateResponse>;
  deleteMemo(props: IDeleteRequest): Promise<IMemoResponse>;
  printMemo(props: IGetRequest): Promise<IMemoResponse>;
}

class MemoService implements IMemoService {
  async getMemo(props: IGetRequest): Promise<IMemoResponse> {
    const response: AxiosResponse<IMemoResponse> = await API.get(
      apiEndpoints.master,
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
      apiEndpoints.master,
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
  async deleteMemo(props: IDeleteRequest): Promise<IMemoResponse> {
    const response: AxiosResponse<IMemoResponse> = await API.delete(
      apiEndpoints.master + `/delete?id=${props.id}`,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    return response.data;
  }

  async printMemo(props: IDeleteRequest): Promise<IMemoResponse> {
    const response: AxiosResponse<IMemoResponse> = await API.get(
      apiEndpoints.master + `/print?id=${props.id}`,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    return response.data;
  }
}

export default MemoService;
