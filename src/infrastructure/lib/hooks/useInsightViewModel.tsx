import InsightUseCase from "@domain/useCases/InsightUseCase";
import InsightService from "@services/InsightService";
import InsightViewModel from "@viewModels/InsightViewModel";
import { useMemo } from "react";

interface UseInsightProps {
  setState: (state: any) => void;
  clearToken: () => void;
  token: string;
}
// certificateHooks.ts
const useInsightViewModel = ({
  clearToken,
  setState,
  token,
}: UseInsightProps) => {
  return useMemo(() => {
    const service = new InsightService();
    const useCase = new InsightUseCase(service);
    return new InsightViewModel(useCase, setState, clearToken, token);
  }, [token, setState, clearToken]);
};

export default useInsightViewModel;
