import apiEndpoints from "@api/apiEndpoints";
import { API } from "@api/APIInstance";
import { AxiosResponse } from "axios";
import {
  ICertificateCreateResponse,
  ICertificateResponse,
  ICertificateResponsePagination,
} from "@domain/entities/CertificateEntity";
import {
  IDeleteRequest,
  IGetRequest,
  IPostRequest,
  IPutRequest,
} from "@domain/entities/ResponseEntity";

export interface ICertificateService {
  getCertificate(props: IGetRequest): Promise<ICertificateResponsePagination>;
  createCertificate(
    props: IPostRequest<FormData>
  ): Promise<ICertificateCreateResponse>;
  deleteCertificate(props: IDeleteRequest): Promise<ICertificateResponse>;
  printCertificate(props: IGetRequest): Promise<ICertificateResponse>;
  findCertificate(props: IGetRequest): Promise<ICertificateResponse>;
  detailCertificate(props: IGetRequest): Promise<ICertificateResponse>;
  editCertificate(
    props: IPutRequest<FormData>
  ): Promise<ICertificateCreateResponse>;
}

class CertificateService implements ICertificateService {
  async getCertificate(
    props: IGetRequest
  ): Promise<ICertificateResponsePagination> {
    const response: AxiosResponse<ICertificateResponsePagination> =
      await API.get(apiEndpoints.master.base, {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: props.params,
      });

    return response.data;
  }
  async findCertificate(props: IGetRequest): Promise<ICertificateResponse> {
    const response: AxiosResponse<ICertificateResponse> = await API.get(
      apiEndpoints.master.find,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
        params: props.params,
      }
    );

    return response.data;
  }
  async detailCertificate(props: IGetRequest): Promise<ICertificateResponse> {
    const response: AxiosResponse<ICertificateResponse> = await API.get(
      apiEndpoints.master.detail,
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

  async editCertificate(
    props: IPutRequest<FormData>
  ): Promise<ICertificateCreateResponse> {
    const response: AxiosResponse<ICertificateCreateResponse> = await API.post(
      apiEndpoints.master.base + "/" + props.id,
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
