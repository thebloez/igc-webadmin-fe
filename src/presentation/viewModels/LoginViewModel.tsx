import LoginUseCase from "@domain/useCases/LoginUseCase";
import menus from "@lib/utils/menus";
import { setSidebar } from "@redux/dashboard/dashboardReduxReducer";
import { setUser } from "@redux/user/userReduxReducer";

interface LoginProps {
  email: string;
  password: string;
}

interface ILoginViewModel {
  login: (props: LoginProps) => void;
}

class LoginViewModel implements ILoginViewModel {
  private loginUseCase: LoginUseCase;
  private dispatch: any;

  constructor(loginUseCase: LoginUseCase, dispatch: any) {
    this.loginUseCase = loginUseCase;
    this.dispatch = dispatch;
  }

  async login(props: LoginProps) {
    try {
      const result = await this.loginUseCase.credentialLogin(
        props.email,
        props.password
      );
      this.dispatch(setSidebar(menus));

      this.dispatch(
        setUser({
          email: props.email,
          fullName: result?.profile?.name,
          token: result?.token,
        })
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

export default LoginViewModel;
