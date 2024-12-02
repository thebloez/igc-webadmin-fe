import { ICustomerService } from "@services/CustomerService";
import isNullOrEmpty from "@lib/utils/isNullOrEmpty";
import logger from "@lib/utils/logger";

export default class CustomerUseCase {
  private customerService: ICustomerService;

  constructor(customerService: ICustomerService) {
    this.customerService = customerService;
  }

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

      throw error;
    }
  }

  async createCustomer(props: { token: string; data: any }) {
    try {
      const result = await this.customerService.post({
        token: props.token,
        data: props.data,
      });

      logger("CustomerUseCase.createCustomer | response =>", result);

      if (isNullOrEmpty(result?.data)) {
        throw new Error(result?.meta?.message ?? "Failed to create customer");
      }

      return result;
    } catch (error: any) {
      logger("CustomerUseCase.createCustomer | error =>", error);

      throw error;
    }
  }
}
