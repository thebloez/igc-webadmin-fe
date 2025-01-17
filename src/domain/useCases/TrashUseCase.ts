import { ITrashService } from "@services/TrashService";
import isNullOrEmpty from "../../infrastructure/lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";
import { IGetRequest } from "@domain/entities/ResponseEntity";

export default class TrashUseCase {
  private trashService: ITrashService;

  constructor(trashService: ITrashService) {
    this.trashService = trashService;
  }

  async getTrash(props: IGetRequest) {
    try {
      const result = await this.trashService.getTrash({
        token: props.token,
        params: props.params,
      });

      logger("TrashUseCase.get | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to trash get");
      }

      return result;
    } catch (error: any) {
      logger("TrashUseCase.get | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }
  async restoreTrash(props: IGetRequest) {
    try {
      const result = await this.trashService.restore({
        token: props.token,
        id: props.id,
      });

      logger("TrashUseCase.restore | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to trash restore");
      }

      return result;
    } catch (error: any) {
      logger("TrashUseCase.restore | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }
  async destroyTrash(props: IGetRequest) {
    try {
      const result = await this.trashService.destroy({
        token: props.token,
        id: props.id,
      });

      logger("TrashUseCase.destroy | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to trash destroy");
      }

      return result;
    } catch (error: any) {
      logger("TrashUseCase.destroy | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }
}
