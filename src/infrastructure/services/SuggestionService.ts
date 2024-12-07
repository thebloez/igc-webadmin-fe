import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import { ISuggestionResponse } from "@domain/entities/SuggestionEntity";
import {
  IDeleteRequest,
  IGetRequest,
  IPutRequest,
} from "@domain/entities/ResponseEntity";

interface ISuggestionDelete extends IDeleteRequest {
  type: string;
}

class SuggestService {
  async get(props: IGetRequest): Promise<ISuggestionResponse> {
    const response: AxiosResponse<ISuggestionResponse> = await API.get(
      apiEndpoints.suggestions.all,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    return response.data;
  }

  async post(props: IPutRequest<any>): Promise<ISuggestionResponse> {
    const response: AxiosResponse<ISuggestionResponse> = await API.post(
      apiEndpoints.suggestions.create(props.id as any),
      props.data,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }

  async delete(props: ISuggestionDelete): Promise<ISuggestionResponse> {
    const response: AxiosResponse<ISuggestionResponse> = await API.delete(
      apiEndpoints.suggestions.delete(props.id as any, props.type as any),
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    return response.data;
  }
}

export default SuggestService;
