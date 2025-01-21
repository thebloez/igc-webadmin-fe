import {
  ITrashModalState,
  ITrashTableState,
} from "@domain/entities/TrashEntity";
import TrashUseCase from "@domain/useCases/TrashUseCase";
import logger from "@lib/utils/logger";
import { SetStateAction } from "react";

class TrashViewModel {
  private trashUseCase: TrashUseCase;
  private token: string;
  private clearToken: any;

  constructor(trashUseCase: TrashUseCase, token: string, clearToken: any) {
    this.trashUseCase = trashUseCase;
    this.token = token;
    this.clearToken = clearToken;
  }

  async getTrash(
    state: ITrashTableState,
    setTable: (value: SetStateAction<ITrashTableState>) => void
  ) {
    try {
      setTable((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.trashUseCase.getTrash({
        token: this.token,
        params: {
          page: state.currentPage,
          per_page: state.pageSize,
          search: state.search,
        },
      });

      logger("TrashViewModel.getTrash | response => ", response);

      if (response) {
        setTable((prevState) => ({
          ...prevState,
          data: response.data,
          total: response.meta?.pagination?.total,
        }));
      }
    } catch (error: any) {
      logger("TrashViewModel.getTrash | error => ", error);

      if (error?.status === 401) {
        this.clearToken();
      }

      throw error;
    } finally {
      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }
  async restoreTrash(
    id: string,
    setModal: (value: SetStateAction<ITrashModalState>) => void,
    setTable: (value: SetStateAction<ITrashTableState>) => void,
    message: any
  ) {
    try {
      setModal((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.trashUseCase.restoreTrash({
        token: this.token,
        id,
      });

      logger("TrashViewModel.restoreTrash | response => ", response);

      if (response) {
        message.success(response.meta?.message ?? "Success to restore");
        setModal((prevState) => ({
          ...prevState,
          visible: false,
        }));
        setTable((prevState) => ({
          ...prevState,
          currentPage: 0,
        }));
      }
    } catch (error: any) {
      logger("TrashViewModel.restoreTrash | error => ", error);

      if (error?.status === 401) {
        this.clearToken();
      } else {
        message.error(error.message ?? "Failed to restore");
      }

      throw error;
    } finally {
      setModal((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }
  async destroyTrash(
    id: string,
    setModal: (value: SetStateAction<ITrashModalState>) => void,
    setTable: (value: SetStateAction<ITrashTableState>) => void,
    message: any
  ) {
    try {
      setModal((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.trashUseCase.destroyTrash({
        token: this.token,
        id,
      });

      logger("TrashViewModel.restoreTrash | response => ", response);

      if (response) {
        message.success(response.meta?.message ?? "Success to restore");
        setModal((prevState) => ({
          ...prevState,
          visible: false,
        }));
        setTable((prevState) => ({
          ...prevState,
          currentPage: 0,
        }));
      }
    } catch (error: any) {
      logger("TrashViewModel.restoreTrash | error => ", error);

      if (error?.status === 401) {
        this.clearToken();
      } else {
        message.error(error?.message ?? "Failed to restore");
      }

      throw error;
    } finally {
      setModal((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }
}

export default TrashViewModel;
