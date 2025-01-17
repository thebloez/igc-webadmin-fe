import {
  ICustomerOption,
  ICustomerTableState,
} from "@domain/entities/CustomerEntity";
import CustomerUseCase from "@domain/useCases/CustomerUseCase";
import logger from "@lib/utils/logger";
import { SetStateAction } from "react";

class CustomerViewModel {
  private customerUseCase: CustomerUseCase;
  private token: string;
  private clearToken: () => void;

  constructor(
    customerUseCase: CustomerUseCase,
    token: string,
    clearToken: () => void
  ) {
    this.customerUseCase = customerUseCase;
    this.token = token;
    this.clearToken = clearToken;
  }

  async getCustomer(
    setTable: (value: SetStateAction<ICustomerTableState>) => void
  ) {
    try {
      setTable((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.customerUseCase.get({ token: this.token });

      logger("CustomerViewModel.getCustomer | response => ", response);

      if (response) {
        setTable((prevState) => ({
          ...prevState,
          data: response.data,
          total: response.meta?.pagination?.total,
        }));
      }
    } catch (error: any) {
      logger("CustomerViewModel.getCustomer | error => ", error);
      throw error;
    } finally {
      setTable((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }

  async getCustomerOption(
    setOption: (value: SetStateAction<ICustomerOption>) => void
  ) {
    try {
      setOption((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      const response = await this.customerUseCase.get({ token: this.token });

      logger("CustomerViewModel.getCustomerOption | response => ", response);

      if (response) {
        const data = response.data.map((item) => ({
          value: item.mobile_phone,
          label: item.nama + " - " + item.mobile_phone,
          id: item.mobile_phone,
        }));
        setOption((prevState) => ({
          ...prevState,
          data,
        }));
      }
    } catch (error: any) {
      logger("CustomerViewModel.getCustomerOption | error => ", error);
      if (error?.status === 401) {
        this.clearToken();
      }
      throw error;
    } finally {
      setOption((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }

  async createCustomer(data: any, message: any) {
    try {
      const response = await this.customerUseCase.createCustomer({
        token: this.token,
        data,
      });

      logger("CustomerViewModel.createCustomer | response => ", response);

      if (response.data) {
        message.success("Berhasil menambahkan customer");
      }
    } catch (error: any) {
      logger("CustomerViewModel.createCustomer | error => ", error);
      if (error?.status === 401) {
        this.clearToken();
      }

      message.error(
        error?.response?.data?.meta?.message ?? "Failed to create customer"
      );

      throw error;
    }
  }
}

export default CustomerViewModel;
