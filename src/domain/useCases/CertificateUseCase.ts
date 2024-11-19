import CertificateService from "@services/CertificateService";
import isNullOrEmpty from "../../infrastructure/lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";
import { ICertificateData } from "@domain/entities/CertificateEntity";

export default class CertificateUseCase {
  private certificateService = new CertificateService();

  async get(props: { token: string }) {
    try {
      const result = await this.certificateService.get({ token: props.token });

      logger("CertificateUseCase.get | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to certificate get");
      }

      return result;
    } catch (error: any) {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      } else {
        logger("CertificateUseCase.get | error =>", error);
      }
      return null;
    }
  }
  async post(props: { token: string; data: ICertificateData }) {
    try {
      const certData = new FormData();

      certData.append("member_phone_number", props.data.member_phone_number);
      certData.append("additional_comment", props.data.additional_comment);
      certData.append("status", props.data.status ? "active" : "inactive");
      certData.append("type", "Sertifikat");

      Object.entries(props.data.attributes).forEach(([key, value]) => {
        certData.append(`attributes[${key}]`, value as any);
      });

      logger("CertificateUseCase.payload | response =>", certData);

      const result = await this.certificateService.post({
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
        window.location.href = "/login";
        return;
      }
      throw error;
    }
  }
}
