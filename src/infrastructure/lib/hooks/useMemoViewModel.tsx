import MemoUseCase from "@domain/useCases/MemoUseCase";
import MemoService from "@services/MemoService";
import MemoViewModel from "@viewModels/MemoViewModel";
import { useMemo } from "react";

const useMemoViewModel = (token: string, clearToken: () => void) => {
  return useMemo(() => {
    const service = new MemoService();
    const useCase = new MemoUseCase(service);
    return new MemoViewModel(useCase, token, clearToken);
  }, [token, clearToken]);
};

export default useMemoViewModel;
