import {
  IMemoData,
  IMemoDeleteState,
  IMemoTableState,
} from "@domain/entities/MemoEntity";
import MemoUseCase from "@domain/useCases/MemoUseCase";
import logger from "@lib/utils/logger";
import { SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";

class MemoViewModel {
  private memoUseCase: MemoUseCase;
  private token: string;

  constructor(memoUseCase: MemoUseCase, token: string) {
    this.memoUseCase = memoUseCase;
    this.token = token;
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
    } finally {
      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }

  createMemo = async (
    data: IMemoData,
    message: any,
    reset: UseFormReset<IMemoData>
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
    } catch (error: any) {
      logger("MemoViewModel.createMemo | error => ", error);
      message.error("Gagal membuat sertifikat");
    }
  };

  deleteMemo = async (
    id: string,
    message: any,
    setModal: (value: SetStateAction<IMemoDeleteState>) => void
  ) => {
    try {
      setModal((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      const response = await this.memoUseCase.delete({
        token: this.token,
        id,
      });

      logger("MemoViewModel.deleteMemo | response => ", response);

      if (response) {
        message.success("Memo berhasil dihapus");
      }
    } catch (error: any) {
      logger("MemoViewModel.deleteMemo | error => ", error);
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
    message: any,
    setModal: (value: SetStateAction<IMemoDeleteState>) => void
  ) => {
    try {
      setModal((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.memoUseCase.printMemo({
        token: this.token,
        id,
      });

      logger("MemoViewModel.printMemo | response => ", response);

      if (response) {
        message.success("Memo berhasil cetak");
      }
    } catch (error: any) {
      logger("MemoViewModel.printMemo | error => ", error);
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
