import TrashUseCase from "@domain/useCases/TrashUseCase";
import TrashService from "@services/TrashService";
import TrashViewModel from "@viewModels/TrashViewModel";
import { useMemo } from "react";

interface UseTrashProps {
  clearToken: () => void;
  token: string;
}

const useTrashViewModel = ({ clearToken, token }: UseTrashProps) => {
  return useMemo(() => {
    const service = new TrashService();
    const useCase = new TrashUseCase(service);
    return new TrashViewModel(useCase, token, clearToken);
  }, [token, clearToken]);
};

export default useTrashViewModel;
