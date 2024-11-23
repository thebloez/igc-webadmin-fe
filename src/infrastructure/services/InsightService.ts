import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import { IInsightResponse } from "@domain/entities/InsightEntity";
import { IGetRequest } from "@domain/entities/ResponseEntity";

export interface IInsightService {
  get(props: IGetRequest): Promise<IInsightResponse>;
}

class InsightService implements IInsightService {
  async get(props: IGetRequest): Promise<IInsightResponse> {
    const response: AxiosResponse<IInsightResponse> = await API.get(
      apiEndpoints.insight,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    return response.data;
  }
}

export default InsightService;
