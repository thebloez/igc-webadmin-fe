import { IMemoData, IMemoTableState } from "@domain/entities/MemoEntity";
import MemoUseCase from "@domain/useCases/MemoUseCase";
import logger from "@lib/utils/logger";
import { SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";

class MemoViewModel {
  private memoUseCase: MemoUseCase;
  private token: string;

  constructor(memoUseCase: MemoUseCase, token: string) {
    this.memoUseCase = memoUseCase;
    this.token = token;
  }

  async getMemo(setTable: (value: SetStateAction<IMemoTableState>) => void) {
    try {
      setTable((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.memoUseCase.getAll({ token: this.token });

      logger("MemoViewModel.getMemo | response => ", response);

      if (response) {
        setTable((prevState) => ({
          ...prevState,
          data: response.data,
          total: response.meta?.pagination?.total,
        }));
      }
    } catch (error: any) {
      logger("MemoViewModel.getMemo | error => ", error);
    } finally {
      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }

  async createMemo(
    token: string,
    data: IMemoData,
    message: any,
    reset: UseFormReset<IMemoData>
  ) {
    try {
      const response = await this.memoUseCase.createMemo({ token, data });

      logger("MemoViewModel.createMemo | response => ", response);

      if (response) {
        message.success("Memo created successfully");
        reset();
      }
    } catch (error: any) {
      logger("MemoViewModel.createMemo | error => ", error);

      message.error(error.message  || "Failed to create memo");
    }
  }
}

export default MemoViewModel;
