import axios from "axios";
import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, getAccessToken } from "axios-jwt";

const USER_BASE_URL = "http://localhost:3015/";
const TRANSACTION_BASE_URL = "http://localhost:3016/";

export const userCleanMicroservice = axios.create({
    baseURL: USER_BASE_URL,
    timeout: 2000,
    headers: {"Access-Control-Allow-Origin": "*"},
    validateStatus: () => true
});

export const userMicroservice = axios.create({
    baseURL: USER_BASE_URL,
    timeout: 2000,
    headers: {"Access-Control-Allow-Origin": "*"},
    validateStatus: () => true
});

export const transactionMicroservice = axios.create({
    baseURL: TRANSACTION_BASE_URL,
    timeout: 2000,
    headers: {"Access-Control-Allow-Origin": "*"},
    validateStatus: () => true
});

const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<IAuthTokens | string> => {
    const response = await userMicroservice.post(`refreshToken`, { 
        refresh: refreshToken, 
        access: getAccessToken() 
    })
  
    return {
        accessToken: response.data.access,
        refreshToken: response.data.refresh
    }
}

applyAuthTokenInterceptor(transactionMicroservice, {
    requestRefresh,
    header: "Authorization",
    headerPrefix: "Bearer "
})

applyAuthTokenInterceptor(userMicroservice, {
    requestRefresh,
    header: "Authorization",
    headerPrefix: "Bearer "
})