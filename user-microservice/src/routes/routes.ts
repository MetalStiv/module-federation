import { Router, Response } from 'express';
import { JWT_EXPIRES, privateKey, userCollection } from '../app';
import { sign, decode } from 'jsonwebtoken';
import { getRandomStr } from '../../../shared/utils/get-random-str'; 
import { ILoginDto } from '../../../shared/types/dto/login-dto';
import { ITokenDto } from '../../../shared/types/dto/token-dto';
import { IJwtData } from '../../../shared/types/jwt-data';
import { ObjectId } from 'mongodb';
import { IUser } from '../model/user';
import { createHash } from 'crypto';
import { ITypedResponse } from '../types/types-response';
import { ITypedRequestBody } from '../types/typed-request-body';

const router = Router();

router.post('/register', async (req: ITypedRequestBody<ILoginDto>, res: Response) => {
    if (!req.body.email || !req.body.password){
        res.status(200).send();
    }

    if (await userCollection.findOne({email: req.body.email})){
        res.status(520).send();
        return;
    }

    const salt = getRandomStr(8);
    const newUser: IUser = {
        _id: new ObjectId(),
        email: req.body.email,
        salt,
        passwordHash: createHash('sha256').update(req.body.password + salt).digest('hex'),
    }

    await userCollection.insertOne(newUser);
    res.status(200).send();
});

router.post('/login', async (req: ITypedRequestBody<ILoginDto>, res: ITypedResponse<ITokenDto>) => {
    const user = await userCollection.findOne({email: req.body.email});
    if (!user){
        res.status(520).send();
        return;
    }

    if (createHash('sha256').update(req.body.password + user.salt).digest('hex') !== user.passwordHash){
        res.status(521).send();
        return;
    }

    const refresh = getRandomStr(16);
    await userCollection.findOneAndUpdate({email: req.body.email}, {$set: {refreshToken: refresh}});

    const access = sign<IJwtData>({
        email: user.email,
        id: user._id,
      }, 
      privateKey, 
      { 
        expiresIn: JWT_EXPIRES,
        algorithm: 'RS256'
    });

    res.status(200).send({
        access,
        refresh
    });
});

router.post('/refreshToken', async (req: ITypedRequestBody<Omit<ITokenDto, "access">>, res: ITypedResponse<ITokenDto>) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token){
        res.status(520).send();
        return;
    }
    const decoded = decode(token);
    const user = await userCollection.findOne({email: decoded.email});
    if (!user){
        res.status(520).send();
        return;
    }
    if (user.refreshToken !== req.body.refresh){
        res.status(521).send();
        return;
    }
    const refresh = getRandomStr(16);
    await userCollection.findOneAndUpdate({email: decoded.email}, {$set: {refreshToken: refresh}});
    const access = sign({
        email: user.email
      }, 
      privateKey, 
      { 
        expiresIn: JWT_EXPIRES,
        algorithm: 'RS256'
    });

    res.status(200).send({
        access,
        refresh
    });    
});

export default router;