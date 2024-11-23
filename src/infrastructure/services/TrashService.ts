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
      apiEndpoints.trash,
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
      apiEndpoints.trash + "/restore?id=" + props.id,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    return response.data;
  }
  async destroy(props: IGetRequest): Promise<ITrashResponse> {
    const response: AxiosResponse<ITrashResponse> = await API.delete(
      apiEndpoints.trash + "/destroy?id=" + props.id,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    return response.data;
  }
}

export default TrashService;
