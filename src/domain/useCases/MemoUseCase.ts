import { IMemoService } from "@services/MemoService";
import isNullOrEmpty from "../../infrastructure/lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";
import { IMemoData } from "@domain/entities/MemoEntity";
import {
  IDeleteRequest,
  IGetRequest,
  IPostRequest,
} from "@domain/entities/ResponseEntity";

export default class MemoUseCase {
  private memoService: IMemoService;
  private clearToken: any;

  constructor(memoService: IMemoService, clearToken: any) {
    this.memoService = memoService;
    this.clearToken = clearToken;
  }

  async get(props: IGetRequest) {
    try {
      const result = await this.memoService.getMemo({
        token: props.token,
        params: props.params,
      });

      logger("MemoUseCase.get | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to memo get");
      }

      return result;
    } catch (error: any) {
      logger("MemoUseCase.get | error =>", error);
      if (error.response?.status === 401) {
        this.clearToken();
        return;
      }

      throw new Error(
        error.response?.data?.meta?.message ?? "Failed to get memo"
      );
    }
  }

  async createMemo(props: IPostRequest<IMemoData>) {
    try {
      const certData = new FormData();

      certData.append("member_phone_number", props.data.member_phone_number);
      certData.append("additional_comment", props.data.additional_comment);
      certData.append("status", props.data.status ? "active" : "inactive");
      certData.append("type", "Sertifikat");

      Object.entries(props.data.attributes).forEach(([key, value]) => {
        certData.append(`attributes[${key}]`, value as any);
      });

      logger("MemoUseCase.payload | response =>", certData);

      const result = await this.memoService.createMemo({
        token: props.token,
        data: certData,
      });

      logger("MemoUseCase.post | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to memo post");
      }

      return result;
    } catch (error: any) {
      logger("MemoUseCase.post | error =>", error);

      if (error.response?.status === 401) {
        this.clearToken();
        return;
      }

      throw error;
    }
  }
  async delete(props: IDeleteRequest) {
    try {
      const result = await this.memoService.deleteMemo({
        token: props.token,
        id: props.id,
      });

      logger("MemoUseCase.delete | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to memo delete");
      }

      return result;
    } catch (error: any) {
      logger("MemoUseCase.delete | error =>", error);

      if (error.response?.status === 401) {
        this.clearToken();
        return;
      }

      throw error;
    }
  }
  async printMemo(props: IDeleteRequest) {
    try {
      const result = await this.memoService.printMemo({
        token: props.token,
        id: props.id,
      });

      logger("MemoUseCase.printMemo | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to print memo");
      }

      return result;
    } catch (error: any) {
      logger("MemoUseCase.printMemo | error =>", error);

      if (error.response?.status === 401) {
        this.clearToken();
        return;
      }

      throw error;
    }
  }
}
