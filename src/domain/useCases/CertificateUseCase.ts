import { ICertificateService } from "@services/CertificateService";
import isNullOrEmpty from "../../infrastructure/lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";
import { ICertificateData } from "@domain/entities/CertificateEntity";
import {
  IDeleteRequest,
  IGetRequest,
  IPostRequest,
} from "@domain/entities/ResponseEntity";

export default class CertificateUseCase {
  private certificateService: ICertificateService;
  private clearToken: any;

  constructor(certificateService: ICertificateService, clearToken: any) {
    this.certificateService = certificateService;
    this.clearToken = clearToken;
  }

  async get(props: IGetRequest) {
    try {
      const result = await this.certificateService.getCertificate({
        token: props.token,
        params: props.params,
      });

      logger("CertificateUseCase.get | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to certificate get");
      }

      return result;
    } catch (error: any) {
      logger("CertificateUseCase.get | error =>", error);
      if (error.response?.status === 401) {
        this.clearToken();
        return;
      }

      throw error;
    }
  }

  async post(props: IPostRequest<ICertificateData>) {
    try {
      const certData = new FormData();

      certData.append("member_phone_number", props.data.member_phone_number);
      certData.append("additional_comment", props.data.additional_comment);
      certData.append("status", "active");
      certData.append("type", "Sertifikat");

      Object.entries(props.data.attributes).forEach(([key, value]) => {
        certData.append(`attributes[${key}]`, value as any);
      });

      logger("CertificateUseCase.payload | response =>", certData);

      const result = await this.certificateService.createCertificate({
        token: props.token,
        data: certData,
      });

      logger("CertificateUseCase.post | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to certificate post");
      }

      return result;
    } catch (error: any) {
      logger("CertificateUseCase.post | error =>", error);

      if (error.response?.status === 401) {
        this.clearToken();
        return;
      }
      throw error;
    }
  }
  async delete(props: IDeleteRequest) {
    try {
      const result = await this.certificateService.deleteCertificate({
        token: props.token,
        id: props.id,
      });

      logger("CertificateUseCase.delete | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(
          result?.meta?.message ?? "Failed to certificate delete"
        );
      }

      return result;
    } catch (error: any) {
      logger("CertificateUseCase.delete | error =>", error);

      if (error.response?.status === 401) {
        this.clearToken();
        return;
      }

      throw error;
    }
  }
}
