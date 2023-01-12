import express, { NextFunction, Request, Response } from 'express';
import { CreateVandor } from '../controllers';

const router = express.Router();

router.post('/',CreateVandor);
router.get('/',(req:Request, res: Response, next: NextFunction) => {
    return res.send({message:'Admin Routes Hello Worlds'});
})

export {router as AdminRoute}