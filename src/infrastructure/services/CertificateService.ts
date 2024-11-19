import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import {
  ICertificateCreateResponse,
  ICertificateResponse,
} from "@domain/entities/CertificateEntity";
import { IGet, IPost } from "@domain/entities/ResponseEntity";

class CertificateService {
  async get(props: IGet): Promise<ICertificateResponse> {
    const response: AxiosResponse<ICertificateResponse> = await API.get(
      apiEndpoints.master,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    return response.data;
  }
  async post(props: IPost): Promise<ICertificateCreateResponse> {
    const response: AxiosResponse<ICertificateCreateResponse> = await API.post(
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

export default CertificateService;
