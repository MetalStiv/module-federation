import { Request } from 'express';
import { IJwtData } from '@packages/shared/src/types/jwt-data';

export type RequestWithDecodedToken = Request & { user?: IJwtData };

export interface ITypedRequestBodyWithDecodedToken<T> extends RequestWithDecodedToken {
    body: T
}