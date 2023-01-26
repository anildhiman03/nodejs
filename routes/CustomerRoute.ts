import express from 'express';
import {
    CustomerGetProfile, CustomerLogin, CustomerRequestOtp, CustomerSignUp, CustomerUpdateProfile, CustomerVerify
} from '../controllers';
import { Authentication } from '../middlewares';

const router = express.Router();

router.post('/signup', CustomerSignUp);
router.post('/login', CustomerLogin);

router.use(Authentication);
router.patch('/verify', CustomerVerify);
router.get('/otp', CustomerRequestOtp);
router.get('/profile', CustomerGetProfile);
router.patch('/profile', CustomerUpdateProfile);

export { router as CustomerRoute }