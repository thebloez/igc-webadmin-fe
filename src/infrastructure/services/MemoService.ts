import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import {
  IMemoCreateResponse,
  IMemoResponse,
  IMemoService,
} from "@domain/entities/MemoEntity";
import { IGet, IPost } from "@domain/entities/ResponseEntity";

class MemoService implements IMemoService {
  async getAll(props: IGet): Promise<IMemoResponse> {
    const response: AxiosResponse<IMemoResponse> = await API.get(
      apiEndpoints.master + "?type=Memo",
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
  async createMemo(props: IPost): Promise<IMemoCreateResponse> {
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
}

export default MemoService;
