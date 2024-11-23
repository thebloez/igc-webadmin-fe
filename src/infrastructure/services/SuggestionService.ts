import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import { ISuggestionResponse } from "@domain/entities/SuggestionEntity";
import { IGetRequest } from "@domain/entities/ResponseEntity";

class SuggestService {
  async get(props: IGetRequest): Promise<ISuggestionResponse> {
    const response: AxiosResponse<ISuggestionResponse> = await API.get(
      apiEndpoints.suggestions,
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
