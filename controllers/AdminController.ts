import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vandor } from "../models";

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    const {name ,address, pincode, foodType, email, password, ownerName, phone} = <CreateVendorInput>req.body;
    
    const createdVandor = await Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: password,
        salt: '',
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
    })


}

export const GetVandor = async (req: Request, res: Response, next: NextFunction) => {
    return res.send({message : 'test'})
}

export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => {
    
}