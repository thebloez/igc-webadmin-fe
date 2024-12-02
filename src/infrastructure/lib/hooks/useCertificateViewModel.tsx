import CertificateUseCase from "@domain/useCases/CertificateUseCase";
import CertificateService from "@services/CertificateService";
import CertificateViewModel from "@viewModels/CertificateViewModel";
import { useMemo } from "react";

// certificateHooks.ts
const useCertificateViewModel = (token: string, clearToken: () => void) => {
  return useMemo(() => {
    const service = new CertificateService();
    const useCase = new CertificateUseCase(service);
    return new CertificateViewModel(useCase, token, clearToken);
  }, [token, clearToken]);
};

export default useCertificateViewModel;
