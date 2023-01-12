import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();


router.get('/',(req:Request, res: Response, next: NextFunction) => {
    return res.send({message:'Vendor Routes Hello Worlds'});
})

export {router as VandorRoute}