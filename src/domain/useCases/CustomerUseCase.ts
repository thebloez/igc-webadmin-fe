import CustomerService from "@services/CustomerService";
import isNullOrEmpty from "@lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";

export default class CustomerUseCase {
  private customerService = new CustomerService();

  async get(props: { token: string }) {
    try {
      const result = await this.customerService.get({ token: props.token });

      logger("CustomerUseCase.get | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to certificate get");
      }

      return result;
    } catch (error: any) {
      logger("CustomerUseCase.get | error =>", error);

      if (error.response?.status === 401) {
        window.location.href = "/login";
      }

      throw error;
    }
  }
}
