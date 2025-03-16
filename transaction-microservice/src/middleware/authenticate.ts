import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { publicKey } from '../app';
import { IJwtData } from '../../../shared/types/jwt-data';

export const authenticateJwt = (req: Request & { user?: IJwtData }, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        verify<IJwtData>(token, publicKey, (err: string, user: IJwtData) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
