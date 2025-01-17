import SuggestionService from "@services/SuggestionService";
import isNullOrEmpty from "../../infrastructure/lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";

export default class SuggestionUseCase {
  private suggestionService = new SuggestionService();

  async get(props: { token: string }) {
    try {
      const result = await this.suggestionService.get({ token: props.token });

      logger("SuggestionUseCase.get | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to get suggestions");
      }

      return result;
    } catch (error: any) {
      logger("SuggestionUseCase.get | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async createSuggestion(props: { token: string; data: any; id: string }) {
    try {
      logger("SuggestionUseCase.createSuggestion | payload =>", props);

      const result = await this.suggestionService.post({
        id: props.id,
        token: props.token,
        data: props.data,
      });

      logger("SuggestionUseCase.createSuggestion | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(
          result?.meta?.message ?? "Failed to create suggestions"
        );
      }

      return result;
    } catch (error: any) {
      logger("SuggestionUseCase.createSuggestion | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }

  async deleteSuggestion(props: { token: string; name: string; type: string }) {
    try {
      const result = await this.suggestionService.delete({
        id: props.name,
        token: props.token,
        type: props.type,
      });

      logger("SuggestionUseCase.deleteSuggestion | response =>", result);

      return result;
    } catch (error: any) {
      logger("SuggestionUseCase.deleteSuggestion | error =>", error);

      const customError = {
        message: error?.response?.data?.meta?.message,
        status: error?.status,
      };

      throw error?.response?.data?.meta?.message ? customError : error;
    }
  }
}
