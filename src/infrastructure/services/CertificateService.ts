import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import {
  ICertificateCreateResponse,
  ICertificateResponse,
} from "@domain/entities/CertificateEntity";
import {
  IDeleteRequest,
  IGetRequest,
  IPostRequest,
} from "@domain/entities/ResponseEntity";

export interface ICertificateService {
  getCertificate(props: IGetRequest): Promise<ICertificateResponse>;
  createCertificate(
    props: IPostRequest<FormData>
  ): Promise<ICertificateCreateResponse>;
  deleteCertificate(props: IDeleteRequest): Promise<ICertificateResponse>;
  printCertificate(props: IGetRequest): Promise<ICertificateResponse>;
}

class CertificateService implements ICertificateService {
  async getCertificate(props: IGetRequest): Promise<ICertificateResponse> {
    const response: AxiosResponse<ICertificateResponse> = await API.get(
      apiEndpoints.master.base,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: props.params,
      }
    );

    return response.data;
  }
  async createCertificate(
    props: IPostRequest<FormData>
  ): Promise<ICertificateCreateResponse> {
    const response: AxiosResponse<ICertificateCreateResponse> = await API.post(
      apiEndpoints.master.base,
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
  async deleteCertificate(
    props: IDeleteRequest
  ): Promise<ICertificateResponse> {
    const response: AxiosResponse<ICertificateResponse> = await API.delete(
      apiEndpoints.master.delete,
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

  async printCertificate(props: IGetRequest): Promise<ICertificateResponse> {
    const response: AxiosResponse<ICertificateResponse> = await API.get(
      apiEndpoints.master.print,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: {
          id: props.id,
          identifier: props.params?.identifier,
        },
      }
    );

    return response.data;
  }
}

export default CertificateService;
