import MemoService from "@services/MemoService";
import isNullOrEmpty from "@lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";
import {
  IMemoCreateResponse,
  IMemoData,
  IMemoResponse,
  IMemoService,
  IMemoUseCase,
} from "@domain/entities/MemoEntity";
import { IGetRequest, IPostRequest } from "@domain/entities/ResponseEntity";

export default class MemoUseCase implements IMemoUseCase {
  private memoService: IMemoService;

  constructor(memoService: IMemoService = new MemoService()) {
    this.memoService = memoService;
  }

  async getAll(props: IGetRequest): Promise<IMemoResponse> {
    try {
      const result = await this.memoService.getAll({ token: props.token });

      logger("MemoUseCase.get | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to certificate get");
      }

      return result;
    } catch (error: any) {
      if (error.response?.status === 401) {
        window.location.href = "/login";
      } else {
        logger("MemoUseCase.get | error =>", error);
      }
      throw null;
    }
  }

  async createMemo(
    props: IPostRequest<IMemoData>
  ): Promise<IMemoCreateResponse> {
    try {
      const memoData = new FormData();

      memoData.append("member_phone_number", props.data.member_phone_number);
      memoData.append("additional_comment", props.data.additional_comment);
      memoData.append("status", props.data.status ? "active" : "inactive");
      memoData.append("type", "Memo");

      Object.entries(props.data.attributes).forEach(([key, value]) => {
        memoData.append(`attributes[${key}]`, value as any);
      });

      logger("MemoUseCase.post | payload =>", memoData);

      const result = await this.memoService.createMemo({
        token: props.token,
        data: memoData,
      });

      logger("MemoUseCase.post | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to create memo");
      }

      return result;
    } catch (error: any) {
      logger("MemoUseCase.post | error =>", error);

      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      throw error;
    }
  }
}
