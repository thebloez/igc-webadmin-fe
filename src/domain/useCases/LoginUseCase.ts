import isNullOrEmpty from "../../infrastructure/lib/utils/isNullOrEmpty";
import logger from "../../infrastructure/lib/utils/logger";
import LoginService from "@services/LoginService";

export default class LoginUseCase {
  private loginService = new LoginService();

  async credentialLogin(email: string, password: string) {
    try {
      const result = await this.loginService.credentialLogin(email, password);

      const resultProfile = await this.loginService.getProfile({
        token: result?.data?.token,
      });

      logger("LoginUseCase.credentialLogin", result);

      if (isNullOrEmpty(result?.data?.token)) {
        throw new Error(result?.meta?.message ?? "Login failed");
      }
      if (isNullOrEmpty(resultProfile?.data)) {
        throw new Error(result?.meta?.message ?? "Profile not found");
      }

      return {
        token: result?.data?.token,
        expires_at: result?.data?.expires_at,
        profile: resultProfile?.data,
      };
    } catch (error) {
      logger("LoginUseCase.credentialLogin", error);

      throw error;
    }
  }
}
