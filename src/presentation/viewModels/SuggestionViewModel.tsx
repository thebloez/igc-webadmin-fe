import { ISuggestionsState } from "@domain/entities/SuggestionEntity";
import SuggestionUseCase from "@domain/useCases/SuggestionUseCase";
import logger from "@lib/utils/logger";
import { SetStateAction } from "react";

class SuggestionViewModel {
  private suggestionUseCase: SuggestionUseCase;
  private token: string;

  constructor(suggestionUseCase: SuggestionUseCase, token: string) {
    this.suggestionUseCase = suggestionUseCase;
    this.token = token;
  }

  async getSuggestion(
    setSuggestion: (value: SetStateAction<ISuggestionsState>) => void
  ) {
    try {
      setSuggestion((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.suggestionUseCase.get({ token: this.token });

      logger("SuggestionViewModel.getSuggestion | response => ", response);

      if (response) {
        setSuggestion((prevState) => ({
          ...prevState,
          data: response.data,
        }));
      }
    } catch (error: any) {
      logger("SuggestionViewModel.getSuggestion | error => ", error);

      throw error;
    } finally {
      setSuggestion((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }

  async createSuggestion(data: any, id: string, message: any) {
    try {
      const response = await this.suggestionUseCase.createSuggestion({
        data: data,
        id: id,
        token: this.token,
      });

      logger("SuggestionViewModel.createSuggestion | response => ", response);

      if (response) {
        message.success("Suggestion created successfully");
      }
    } catch (error: any) {
      logger("SuggestionViewModel.createSuggestion | error => ", error);

      message.error(error.message ?? "Failed to create suggestion");

      throw error;
    }
  }
}

export default SuggestionViewModel;
