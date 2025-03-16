import { setAuthTokens, clearAuthTokens, getAccessToken } from "axios-jwt";
import { userCleanMicroservice } from "../constants/axios-microservices";
import { IJwtData } from '../../../shared/types/jwt-data';
import { ILoginDto } from '../../../shared/types/dto/login-dto';
import { ITokenDto } from '../../../shared/types/dto/token-dto';
import jwt_decode from "jwt-decode";

export const login = async (params: ILoginDto, loginHandler: () => void): Promise<IJwtData> => {
  const response = await userCleanMicroservice.post<ITokenDto>('login', params);
  if (response.status !== 200){
    throw response.status;
  }

  setAuthTokens({
    accessToken: response.data.access,
    refreshToken: response.data.refresh
  })

  loginHandler()

  return jwt_decode(response.data.access);;
}

export const getUserId = async () => {
  let decoded: IJwtData = jwt_decode(await getAccessToken() || '');
  return decoded.id;
}

export const logout = (logoutHandler: () => void) => {
  clearAuthTokens();
  logoutHandler();
}