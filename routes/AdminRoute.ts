import express from 'express';
import { CreateVandor, GetVandor, GetVandorByID } from '../controllers';

const router = express.Router();

router.post('/vendor',CreateVandor);
router.get('/vendor',GetVandor)
router.get('/vendor/:id',GetVandorByID)

export {router as AdminRoute}