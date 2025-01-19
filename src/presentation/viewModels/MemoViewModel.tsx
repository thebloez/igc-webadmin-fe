import { UpgradeType } from "@api/apiEndpoints";
import {
  IMemoFormData,
  IMemoModalState,
  IMemoTableState,
  IMemoUpgradeState,
} from "@domain/entities/MemoEntity";
import MemoUseCase from "@domain/useCases/MemoUseCase";
import logger from "@lib/utils/logger";
import { SetStateAction } from "react";
import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { NavigateFunction } from "react-router-dom";

class MemoViewModel {
  private memoUseCase: MemoUseCase;
  private token: string;
  private clearToken: () => void;

  constructor(memoUseCase: MemoUseCase, token: string, clearToken: () => void) {
    this.memoUseCase = memoUseCase;
    this.token = token;
    this.clearToken = clearToken;
  }

  async getMemo(
    state: IMemoTableState,
    setTable: (value: SetStateAction<IMemoTableState>) => void
  ) {
    try {
      setTable((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.memoUseCase.get({
        token: this.token,
        params: {
          page: state.currentPage,
          per_page: state.pageSize,
          search: state.search,
        },
      });

      logger("MemoViewModel.getMemo | response => ", response);

      if (response) {
        setTable((prevState) => ({
          ...prevState,
          data: response.data,
          total: response.meta?.pagination?.total,
        }));
      }
    } catch (error: any) {
      logger("MemoViewModel.getMemo | error => ", error);

      if (error?.status === 401) {
        this.clearToken();
      }
    } finally {
      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }

  async findMemo(
    state: IMemoUpgradeState,
    setTable: (value: SetStateAction<IMemoUpgradeState>) => void,
    setValue: UseFormSetValue<IMemoFormData>
  ) {
    try {
      setTable((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.memoUseCase.findMemo({
        token: this.token,
        params: {
          id: state.id,
        },
      });

      logger("MemoViewModel.findMemo | response => ", response);

      if (response) {
        setValue("attributes", response.data.attributes as any);
        setValue("id", response.data.id);
        setValue("member_phone_number", response.data.member_phone_number);
      }
    } catch (error: any) {
      logger("MemoViewModel.findMemo | error => ", error);

      if (error?.status === 401) {
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
  
  async detailMemo(
    state: IMemoUpgradeState,
    setTable: (value: SetStateAction<IMemoUpgradeState>) => void,
    setValue: UseFormSetValue<IMemoFormData>
  ) {
    try {
      setTable((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.memoUseCase.detailMemo({
        token: this.token,
        params: {
          id: state.id,
        },
      });

      logger("MemoViewModel.findMemo | response => ", response);

      if (response) {
        setValue("attributes", response.data.attributes as any);
        setValue("id", response.data.master.id);
        const split = response.data.master.id.split("-")[1];
        if(split == "M2") {
          setTable((prevState) => ({
            ...prevState,
            isShowOrigin: false,
          }));
        }
        setValue("type", response.data.master.type);
        setValue("member_phone_number", response.data.member.mobile_phone);
      }
    } catch (error: any) {
      logger("MemoViewModel.findMemo | error => ", error);

      if (error?.status === 401) {
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

  createMemo = async (
    data: IMemoFormData,
    message: any,
    reset: UseFormReset<IMemoFormData>
  ) => {
    try {
      const response = await this.memoUseCase.createMemo({
        token: this.token,
        data,
      });

      logger("MemoViewModel.createMemo | response => ", response);

      if (response) {
        message.success("Memo berhasil dibuat");
        reset();
      }

      return response;
    } catch (error: any) {
      if (error?.status === 401) {
        this.clearToken();
      }

      logger("MemoViewModel.createMemo | error => ", error);
      message.error("Gagal membuat Memo");

      throw error;
    }
  };

  async editMemo(
    data: IMemoFormData,
    message: any,
    navigate: NavigateFunction
  ) {
    try {
      const response = await this.memoUseCase.edit({
        token: this.token,
        data,
        id: data.id,
      });

      logger("CertificateViewModel.editCertificate | response => ", response);

      if (response) {
        message.success("Memo berhasil diubah");
        navigate("/certificate");
      }
    } catch (error: any) {
      logger("CertificateViewModel.editCertificate | error => ", error);
      if (error?.status === 401) {
        this.clearToken();
      }
      message.error("Gagal mengubah memo");
    }
  }


  upgradeMemo = async (
    data: IMemoFormData,
    message: any,
    navigate: NavigateFunction,
    type: UpgradeType
  ) => {
    try {
      const response = await this.memoUseCase.upgradeMemo(
        {
          token: this.token,
          data,
        },
        type
      );

      logger("MemoViewModel.upgradeMemo | response => ", response);

      if (response.data) {
        message.success("Memo berhasil diupgrade");
        navigate("/memo");
      }
    } catch (error: any) {
      if (error?.status === 401) {
        this.clearToken();
      }

      logger("MemoViewModel.upgradeMemo | error => ", error);

      message.error("Gagal upgrade memo");
    }
  };

  deleteMemo = async (
    id: string,
    message: any,
    setModal: (value: SetStateAction<IMemoModalState>) => void
  ) => {
    try {
      setModal((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const response = await this.memoUseCase.delete({
        token: this.token,
        id: id as any,
      });

      logger("MemoViewModel.deleteMemo | response => ", response);

      if (response) {
        message.success("Memo berhasil dihapus");
      }
    } catch (error: any) {
      logger("MemoViewModel.deleteMemo | error => ", error);
      if (error?.status === 401) {
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

  printMemo = async (
    id: string,
    identifier: string,
    message: any,
    setModal: (value: SetStateAction<IMemoModalState>) => void
  ) => {
    try {
      setModal((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.memoUseCase.printMemo({
        token: this.token,
        id,
        params: {
          identifier,
        },
      });

      logger("MemoViewModel.printMemo | response => ", response);

      if (response) {
        message.success("Memo berhasil cetak");
      }
    } catch (error: any) {
      logger("MemoViewModel.printMemo | error => ", error);
      if (error?.status === 401) {
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
}

export default MemoViewModel;
