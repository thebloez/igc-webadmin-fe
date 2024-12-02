import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import {
  ICustomerData,
  ICustomerResponse,
} from "@domain/entities/CustomerEntity";
import { IGetRequest, IPostRequest } from "@domain/entities/ResponseEntity";

export interface ICustomerService {
  get(props: IGetRequest): Promise<ICustomerResponse>;
  post(props: IPostRequest<ICustomerData>): Promise<ICustomerResponse>;
}

class CustomerService {
  async get(props: IGetRequest): Promise<ICustomerResponse> {
    const response: AxiosResponse<ICustomerResponse> = await API.get(
      apiEndpoints.members,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    return response.data;
  }

  async post(props: IPostRequest<ICustomerData>): Promise<ICustomerResponse> {
    const response: AxiosResponse<ICustomerResponse> = await API.post(
      apiEndpoints.members,
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
}

export default CustomerService;
