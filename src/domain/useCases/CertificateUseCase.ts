import { ICertificateService } from "@services/CertificateService";
import isNullOrEmpty from "../../infrastructure/lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";
import { ICertificateFormData } from "@domain/entities/CertificateEntity";
import {
  IDeleteRequest,
  IGetRequest,
  IPostRequest,
  IPutRequest,
} from "@domain/entities/ResponseEntity";

export default class CertificateUseCase {
  private certificateService: ICertificateService;

  constructor(certificateService: ICertificateService) {
    this.certificateService = certificateService;
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

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async edit(props: IPutRequest<ICertificateFormData>) {
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

      const result = await this.certificateService.editCertificate({
        token: props.token,
        data: certData,
        id: props.id,
      });

      logger("CertificateUseCase.edit | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to certificate edit");
      }

      return result;
    } catch (error: any) {
      logger("CertificateUseCase.edit | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async post(props: IPostRequest<ICertificateFormData>) {
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

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
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

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async printCertificate(props: IGetRequest) {
    try {
      const result = await this.certificateService.printCertificate({
        token: props.token,
        id: props.id,
        params: {
          identifier: props.params?.identifier,
        },
      });

      logger("CertificateUseCase.printCertificate | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to print certificate");
      }

      return result;
    } catch (error: any) {
      logger("CertificateUseCase.printCertificate | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async findCertificate(props: IGetRequest) {
    try {
      const result = await this.certificateService.findCertificate({
        token: props.token,
        params: props.params,
      });

      logger("CertificateUseCase.find | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to find certificate");
      }

      return result;
    } catch (error: any) {
      logger("CertificateUseCase.find | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }
}
