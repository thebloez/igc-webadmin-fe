import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import {
  IInsightResponse,
  ITopMembersResponse,
  TopMemberPeriodPreset,
} from "@domain/entities/InsightEntity";
import { IBaseRequest, IGetRequest } from "@domain/entities/ResponseEntity";

export interface IInsightService {
  get(props: IGetRequest): Promise<IInsightResponse>;
  getTopMembers(props: IGetTopMembersRequest): Promise<ITopMembersResponse>;
}

export interface IGetTopMembersRequest extends IBaseRequest {
  params: {
    period: TopMemberPeriodPreset;
  };
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

  async getTopMembers(
    props: IGetTopMembersRequest
  ): Promise<ITopMembersResponse> {
    const response: AxiosResponse<ITopMembersResponse> = await API.get(
      apiEndpoints.insightTopMembers,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: {
          period: props.params.period,
        },
      }
    );

    return response.data;
  }
}

export default InsightService;
