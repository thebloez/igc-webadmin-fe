import { API } from "@api/APIInstance";
import { IGetRequest, IResponseEntity } from "@domain/entities/ResponseEntity";
import { AxiosResponse } from "axios";
import {
  ILoginData,
  ILoginResponse,
  IProfileResponse,
} from "@domain/entities/LoginEntity";
import apiEndpoints from "@api/apiEndpoints";

class LoginService {
  async credentialLogin(
    email: string,
    password: string
  ): Promise<ILoginResponse> {
    const response: AxiosResponse<IResponseEntity<ILoginData>> = await API.post(
      apiEndpoints.auth.login,
      JSON.stringify({
        email,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }
  async getProfile(props: IGetRequest): Promise<IProfileResponse> {
    const response: AxiosResponse<IProfileResponse> = await API.get(
      apiEndpoints.auth.profile,
      {
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      }
    );

    return response.data;
  }
}

export default LoginService;
