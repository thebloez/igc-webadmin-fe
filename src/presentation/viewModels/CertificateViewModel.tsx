import {
  ICertificateData,
  ICertificateTableState,
} from "@domain/entities/CertificateEntity";
import CertificateUseCase from "@domain/useCases/CertificateUseCase";
import logger from "@lib/utils/logger";
import { SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";

class CertificateViewModel {
  private certificateUseCase: CertificateUseCase;
  private token: string;

  constructor(certificateUseCase: CertificateUseCase, token: string) {
    this.certificateUseCase = certificateUseCase;
    this.token = token;
  }

  async getCertificate(
    setTable: (value: SetStateAction<ICertificateTableState>) => void
  ) {
    try {
      setTable((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.certificateUseCase.get({ token: this.token });

      logger("CertificateViewModel.getCertificate | response => ", response);

      if (response) {
        setTable((prevState) => ({
          ...prevState,
          data: response.data,
          total: response.meta?.pagination?.total,
        }));
      }

      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    } catch (error: any) {
      logger("CertificateViewModel.getCertificate | error => ", error);
      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }

  createCertificate = async (
    token: string,
    data: ICertificateData,
    message: any,
    reset: UseFormReset<ICertificateData>
  ) => {
    try {
      const response = await this.certificateUseCase.post({ token, data });

      logger("CertificateViewModel.createCertificate | response => ", response);

      if (response) {
        message.success("Sertifikat berhasil dibuat");
        reset();
      }
    } catch (error: any) {
      logger("CertificateViewModel.createCertificate | error => ", error);
      message.error("Gagal membuat sertifikat");
    }
  };
}

export default CertificateViewModel;
