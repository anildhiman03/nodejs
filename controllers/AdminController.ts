import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVandor = async (id: string | undefined, email?:string) => {
    if(email){
        return await Vandor.findOne({ email: email})
    }else{
        return await Vandor.findById(id);
    }
}

export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    const {name ,address, pincode, foodType, email, password, ownerName, phone} = <CreateVendorInput>req.body;
    
    let recordFound = await FindVandor(undefined, email);

    if (recordFound) {
        return res.send({operation:'error', message : 'email Already exist'})
    }

    // salt and password
    const salt = await GenerateSalt();
    const encriptPassword = await GeneratePassword(password, salt);

    const createdVandor = await Vandor.create({
        name: name,
        address: address,
        pincode: pincode,
        foodType: foodType,
        email: email,
        password: encriptPassword,
        salt: salt ,
        ownerName: ownerName,
        phone: phone,
        rating: 0,
        serviceAvailable: false,
        coverImages: [],
        foods: []
    })

    res.send(createdVandor);

}

export const GetVandor = async (req: Request, res: Response, next: NextFunction) => {
    const vandors = await Vandor.find();

    if (vandors !== null) {
        return res.send(vandors);
    }

    return res.send({ operation: 'error', message: 'No vandor found' });
}

export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => {

    const vandor = await FindVandor(req.params.id);

    if (vandor !== null) {
        return res.send(vandor);
    }
    
    return res.send({ operation: 'error', message: 'No vandor found' });
}