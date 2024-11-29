import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import { ITrashResponse } from "@domain/entities/TrashEntity";
import { IGetRequest } from "@domain/entities/ResponseEntity";

export interface ITrashService {
  getTrash(props: IGetRequest): Promise<ITrashResponse>;
  restore(props: IGetRequest): Promise<ITrashResponse>;
  destroy(props: IGetRequest): Promise<ITrashResponse>;
}

class TrashService {
  async getTrash(props: IGetRequest): Promise<ITrashResponse> {
    const response: AxiosResponse<ITrashResponse> = await API.get(
      apiEndpoints.master.trash,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: props.params,
      }
    );

    return response.data;
  }
  async restore(props: IGetRequest): Promise<ITrashResponse> {
    const response: AxiosResponse<ITrashResponse> = await API.get(
      apiEndpoints.master["trash/restore"],
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
  async destroy(props: IGetRequest): Promise<ITrashResponse> {
    const response: AxiosResponse<ITrashResponse> = await API.delete(
      apiEndpoints.master["trash/destroy"],
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
}

export default TrashService;
