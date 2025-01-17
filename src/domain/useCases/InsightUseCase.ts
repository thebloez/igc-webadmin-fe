import { IInsightService } from "@services/InsightService";
import isNullOrEmpty from "../../infrastructure/lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";
import { IGetRequest } from "@domain/entities/ResponseEntity";
import InsightMapper from "@domain/mappers/InsightMapper";

export interface IInsightUseCase {
  get(props: IGetRequest): Promise<any>;
}

export default class InsightUseCase implements IInsightUseCase {
  private insightService: IInsightService;

  constructor(insightService: IInsightService) {
    this.insightService = insightService;
  }

  async get(props: IGetRequest) {
    try {
      const result = await this.insightService.get({ token: props.token });

      logger("InsightUseCase.get | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to get insights");
      }

      const presentationData = InsightMapper.toPresentation(result.data);
      
      return {
        data: presentationData,
        meta: result.meta,
      };
    } catch (error: any) {
      logger("InsightUseCase.get | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }
}
