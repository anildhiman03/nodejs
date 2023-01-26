import { NextFunction, Request, Response } from "express";
import { AuthPayload } from "../dto/Auth.dto";
import { validateSignature } from "../utility";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
}

export const Authentication = async (req:Request, res:Response, next:NextFunction) => {
    const validate = await validateSignature(req);
    
    if (!validate) {
        return res.json({operation:'error','message':'Invalid Authorization'})
    }

    next();
}