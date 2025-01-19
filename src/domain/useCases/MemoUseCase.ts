import { IMemoService } from "@services/MemoService";
import isNullOrEmpty from "../../infrastructure/lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";
import { IMemoFormData } from "@domain/entities/MemoEntity";
import {
  IDeleteRequest,
  IGetRequest,
  IPostRequest,
  IPutRequest,
} from "@domain/entities/ResponseEntity";
import { UpgradeType } from "@api/apiEndpoints";

export default class MemoUseCase {
  private memoService: IMemoService;

  constructor(memoService: IMemoService) {
    this.memoService = memoService;
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

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async findMemo(props: IGetRequest) {
    try {
      const result = await this.memoService.findMemo({
        token: props.token,
        params: props.params,
      });

      logger("MemoUseCase.find | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to find memo");
      }

      return result;
    } catch (error: any) {
      logger("MemoUseCase.find | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async createMemo(props: IPostRequest<IMemoFormData>) {
    try {
      const certData = new FormData();

      certData.append("member_phone_number", props.data.member_phone_number);
      certData.append("additional_comment", props.data.additional_comment);
      certData.append("status", "active");
      certData.append("type", "Memo");

      Object.entries(props.data.attributes).forEach(([key, value]) => {
        certData.append(`attributes[${key}]`, value ?? "");
      });

      logger("MemoUseCase.createMemo | payload =>", certData);

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

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async detailMemo(props: IGetRequest) {
    try {
      const result = await this.memoService.detailMemo({
        token: props.token,
        params: props.params,
      });

      logger("MemoUseCase.detail | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to detail memo");
      }

      return result;
    } catch (error: any) {
      logger("MemoUseCase.detail | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async edit(props: IPutRequest<IMemoFormData>) {
    try {
      const certData = new FormData();

      certData.append("member_phone_number", props.data.member_phone_number);
      certData.append("additional_comment", props.data.additional_comment);
      certData.append("status", "active");
      certData.append("type", "Memo");
      certData.append("_method", "PUT");

      Object.entries(props.data.attributes).forEach(([key, value]) => {
        if (typeof value === "string" && value.startsWith("http")) {
          fetch(value)
            .then((res) => res.blob())
            .then((blob) => {
              const file = new File([blob], "image.jpg", {
                type: "image/jpeg",
              });
              certData.append(`attributes[${key}]`, file);
            });
          return;
        } else {
          certData.append(`attributes[${key}]`, value as any);
        }
      });

      logger("CertificateUseCase.payload | response =>", certData);

      const result = await this.memoService.editMemo({
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

  async upgradeMemo(props: IPostRequest<IMemoFormData>, type: UpgradeType) {
    try {
      const certData = new FormData();

      certData.append("id", props.data.id);
      certData.append("member_phone_number", props.data.member_phone_number);
      certData.append("additional_comment", props.data.additional_comment);
      certData.append("status", "active");
      certData.append("type", "Memo");

      Object.entries(props.data.attributes).forEach(([key, value]) => {
        certData.append(`attributes[${key}]`, value ?? "");
      });

      logger("MemoUseCase.upgradeMemo | payload =>", certData);

      const result = await this.memoService.upgradeMemo(
        {
          id: props.data.id,
        },
        {
          token: props.token,
          data: certData,
        },
        type
      );

      logger("MemoUseCase.upgradeMemo | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to upgrade memo");
      }

      return result;
    } catch (error: any) {
      logger("MemoUseCase.upgradeMemo | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
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

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async printMemo(props: IGetRequest) {
    try {
      const result = await this.memoService.printMemo({
        token: props.token,
        id: props.id,
        params: {
          identifier: props.params?.identifier,
        },
      });

      logger("MemoUseCase.printMemo | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to print memo");
      }

      return result;
    } catch (error: any) {
      logger("MemoUseCase.printMemo | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }
}
