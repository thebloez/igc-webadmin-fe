import {
  ICertificateEditState,
  ICertificateFormData,
  ICertificateModalState,
  ICertificateTableState,
} from "@domain/entities/CertificateEntity";
import CertificateUseCase from "@domain/useCases/CertificateUseCase";
import logger from "@lib/utils/logger";
import { SetStateAction } from "react";
import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

class CertificateViewModel {
  private certificateUseCase: CertificateUseCase;
  private token: string;
  private clearToken: () => void;

  constructor(
    certificateUseCase: CertificateUseCase,
    token: string,
    clearToken: () => void
  ) {
    this.certificateUseCase = certificateUseCase;
    this.token = token;
    this.clearToken = clearToken;
  }

  async getCertificate(
    state: ICertificateTableState,
    setTable: (value: SetStateAction<ICertificateTableState>) => void
  ) {
    try {
      setTable((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.certificateUseCase.get({
        token: this.token,
        params: {
          page: state.currentPage,
          per_page: state.pageSize,
          search: state.search,
        },
      });

      logger("CertificateViewModel.getCertificate | response => ", response);

      if (response) {
        setTable((prevState) => ({
          ...prevState,
          data: response.data,
          total: response.meta?.pagination?.total,
        }));
      }
    } catch (error: any) {
      logger("CertificateViewModel.getCertificate | error => ", error);

      if (error?.response?.status === 401) {
        this.clearToken();
      }
    } finally {
      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }

  createCertificate = async (
    data: ICertificateFormData,
    message: any,
    reset: UseFormReset<ICertificateFormData>
  ) => {
    try {
      const response = await this.certificateUseCase.post({
        token: this.token,
        data,
      });

      logger("CertificateViewModel.createCertificate | response => ", response);

      if (response) {
        message.success("Sertifikat berhasil dibuat");
        reset();
      }
    } catch (error: any) {
      logger("CertificateViewModel.createCertificate | error => ", error);
      if (error?.response?.status === 401) {
        this.clearToken();
      }
      message.error("Gagal membuat sertifikat");
    }
  };

  deleteCertificate = async (
    id: string,
    message: any,
    setModal: (value: SetStateAction<ICertificateModalState>) => void
  ) => {
    try {
      setModal((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const response = await this.certificateUseCase.delete({
        token: this.token,
        id,
      });

      logger("CertificateViewModel.deleteCertificate | response => ", response);

      if (response) {
        message.success("Sertifikat berhasil dihapus");
      }
    } catch (error: any) {
      logger("CertificateViewModel.deleteCertificate | error => ", error);
      if (error?.response?.status === 401) {
        this.clearToken();
      }
      message.error(error.message);
    } finally {
      setModal((prevState) => ({
        ...prevState,
        isLoading: false,
        visible: false,
      }));
    }
  };

  printCertificate = async (
    id: string,
    identifier: string,
    message: any,
    setModal: (value: SetStateAction<ICertificateModalState>) => void
  ) => {
    try {
      setModal((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.certificateUseCase.printCertificate({
        token: this.token,
        id,
        params: {
          identifier,
        },
      });

      logger("CertificateViewModel.printCertificate | response => ", response);

      if (response) {
        message.success("Certificate berhasil cetak");
      }
    } catch (error: any) {
      logger("CertificateViewModel.printCertificate | error => ", error);
      if (error?.response?.status === 401) {
        this.clearToken();
      }
      message.error(error.message);
    } finally {
      setModal((prevState) => ({
        ...prevState,
        isLoading: false,
        visible: false,
      }));
    }
  };

  async editCertificate(
    data: ICertificateFormData,
    message: any,
    navigate: NavigateFunction
  ) {
    try {
      const response = await this.certificateUseCase.edit({
        token: this.token,
        data,
        id: data.id,
      });

      logger("CertificateViewModel.editCertificate | response => ", response);

      if (response) {
        message.success("Sertifikat berhasil diubah");
        navigate("/certificate");
      }
    } catch (error: any) {
      logger("CertificateViewModel.editCertificate | error => ", error);
      if (error?.response?.status === 401) {
        this.clearToken();
      }
      message.error("Gagal mengubah sertifikat");
    }
  }

  async findCertificate(
    state: ICertificateEditState,
    setTable: (value: SetStateAction<ICertificateEditState>) => void,
    setValue: UseFormSetValue<ICertificateFormData>
  ) {
    try {
      setTable((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.certificateUseCase.findCertificate({
        token: this.token,
        params: {
          id: state.id,
        },
      });

      logger("CertificateViewModel.findCertificate | response => ", response);

      if (response) {
        setValue("attributes", response.data.attributes as any);
        setValue("additional_comment", response.data.additional_comment);
        setValue("id", response.data.id);
        setValue("member_phone_number", response.data.member_phone_number);
        setValue("type", response.data.type);
      }
    } catch (error: any) {
      logger("CertificateViewModel.findCertificate | error => ", error);

      if (error?.response?.status === 401) {
        this.clearToken();
      }
      setTable((prevState) => ({
        ...prevState,
        error: {
          status: true,
          message: error.message,
        },
      }));
    } finally {
      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }
}

export default CertificateViewModel;
