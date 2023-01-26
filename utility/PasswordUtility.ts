import brycpt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';
import { VandorPayload } from '../dto';
import { AuthPayload } from '../dto/Auth.dto';

export const GenerateSalt = async () => {
    return await brycpt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await brycpt.hash(password, salt);
}

export const ValidateGeneratedPassword = async (inputPass: string, dbPass: string, salt: string) => {
    return await GeneratePassword(inputPass, salt) === dbPass;
}

export const GenerateSignature = (payload: AuthPayload) => {
    return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });
}

export const validateSignature = async (req: Request) => {
    const signature = req.get('Authorization');


    if (signature) {
        const payload = jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload;
        req.user = payload;
        return true;
    }
}