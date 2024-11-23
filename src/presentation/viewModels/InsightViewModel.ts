import { IInsightsState } from "@domain/entities/InsightEntity";
import InsightUseCase from "@domain/useCases/InsightUseCase";
import logger from "@lib/utils/logger";
import { SetStateAction } from "react";

class InsightViewModel {
  private insightUseCase: InsightUseCase;
  private setInsight: (value: SetStateAction<IInsightsState>) => void;
  private clearToken: any;
  private token: string = "";

  constructor(
    insightUseCase: InsightUseCase,
    setInsight: (value: SetStateAction<IInsightsState>) => void,
    clearToken: any,
    token: string
  ) {
    this.insightUseCase = insightUseCase;
    this.setInsight = setInsight;
    this.clearToken = clearToken;
    this.token = token;
  }

  async getInsight() {
    try {
      this.setInsight((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.insightUseCase.get({ token: this.token });

      logger("InsightViewModel.getInsight | response => ", response);

      if (response) {
        this.setInsight((prevState) => ({
          ...prevState,
          data: response.data,
        }));
      }
    } catch (error: any) {
      logger("InsightViewModel.getInsight | error => ", error);
      if (error.response?.status === 401) {
        this.clearToken();
      }

      throw error;
    } finally {
      this.setInsight((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }
}

export default InsightViewModel;
