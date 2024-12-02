import CustomerUseCase from "@domain/useCases/CustomerUseCase";
import CustomerService from "@services/CustomerService";
import CustomerViewModel from "@viewModels/CustomerViewModel";
import { useMemo } from "react";

const useCustomerViewModel = (token: string, clearToken: () => void) => {
  return useMemo(() => {
    const service = new CustomerService();
    const useCase = new CustomerUseCase(service);
    return new CustomerViewModel(useCase, token, clearToken);
  }, [token, clearToken]);
};

export default useCustomerViewModel;
