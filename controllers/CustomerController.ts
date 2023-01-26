import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CustomerCustomerInputs } from '../dto/Customer.dto';
import { GenerateOTP, GeneratePassword, GenerateSalt, GenerateSignature, onRequestOTP } from "../utility";
import { Customer } from "../models";

export const CustomerSignUp = async (req: Request, res: Response, next: NextFunction) => {
    const customerInputs = plainToInstance(CustomerCustomerInputs, req.body);

    const inputErrors = await validate(customerInputs, {
        validationError: { target: true }
    });

    if (inputErrors.length > 0) {
        return res.status(400).json(inputErrors)
    }

    const { email, phone, password } = req.body;

    const salt = await GenerateSalt();
    const pass = await GeneratePassword(password, salt);

    const { otp, expiry } = GenerateOTP();

    //already exist check 
    let exist = await Customer.find({ email: email });
    if (!exist) {
        return res
            .status(409)
            .json({
                operation: 'error',
                message: 'email already exist'
            });
    }

    const result = await Customer.create({
        email: email,
        phone: phone,
        password: pass,
        otp: otp,
        otp_expire: expiry,
        salt: salt,
        first_name: '',
        last_name: '',
        address: '',
        verified: false,
        lat: 0,
        long: 0
    });

    if (result) {
        //send otp
        await onRequestOTP(otp, phone);

        //generate signature | login user
        const signature = await GenerateSignature({
            _id: result._id,
            email: result.email,
            verified: result.verified
        });

        // return success
        return res.json({
            signature,
            email: result.email,
            verified: result.verified
        });
    }

    return res
        .status(400)
        .json({
            operation: 'error',
            message: 'error while signup'
        });
}

export const CustomerLogin = async (req: Request, res: Response, next: NextFunction) => {

    // const loginInputs

}


export const CustomerVerify = async (req: Request, res: Response, next: NextFunction) => {

    const { otp } = req.body;
    const customer = req.user;

    if (customer) {
        const profile = await Customer.findById(customer._id);

        if (profile) {

            if (profile.otp == parseInt(otp) && profile.otp_expire >= new Date()) {
                profile.verified = true;
                const result = await profile.save();
                //generate signature | login user
                const signature = await GenerateSignature({
                    _id: result._id,
                    email: result.email,
                    verified: result.verified
                });

                // return success
                return res.json({
                    signature,
                    email: result.email,
                    verified: result.verified
                });
            }

            return res.json({
                operation: 'error',
                message: 'Invalid OTP'
            });
        }
        return res.json({
            operation: 'error',
            message: 'Invalid Profile'
        });
    }
    // return error
    return res.json({
        operation: 'error',
        message: 'Error while otp verification'
    });

}
export const CustomerRequestOtp = async (req: Request, res: Response, next: NextFunction) => { }
export const CustomerGetProfile = async (req: Request, res: Response, next: NextFunction) => { }
export const CustomerUpdateProfile = async (req: Request, res: Response, next: NextFunction) => { }