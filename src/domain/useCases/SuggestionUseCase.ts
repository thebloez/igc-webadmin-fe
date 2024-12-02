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

      throw error;
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

      throw error;
    }
  }
}
