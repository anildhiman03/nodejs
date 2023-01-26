import { Response, Request, NextFunction } from 'express';
import { VandorEditInput, VandorLoginInput } from '../dto';
import { createFoodInput } from '../dto/Food.dto';
import { Food } from '../models';
import { GenerateSignature, ValidateGeneratedPassword } from '../utility';
import { FindVandor } from './AdminController';


export const VandorLogin =async (req:Request, res: Response, next:NextFunction) => {
    const { email, password } = <VandorLoginInput>req.body;

    const existingVandor = await FindVandor(undefined, email);
    if (existingVandor !== null) {
        const validate = await ValidateGeneratedPassword(password, existingVandor.password, existingVandor.salt);

        if (validate) {

            const signature = GenerateSignature({
                _id: existingVandor._id,
                email: existingVandor.email,
                name: existingVandor.name,
                foodTypes: existingVandor.foodType
            })
            return res.json(signature);
        } else {
            return res.json({ operation: 'error', 'message': 'invalid password' });
        }
    }

    return res.json({ operation: 'error', 'message': 'invalid login' })
}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
        const existingVandor = await FindVandor(req.user._id);
        return res.json(existingVandor);
    } 

    return res.json({operation:'error','message':'vandor not found'});
}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, phone, foodTypes } = <VandorEditInput>req.body;
    if (req.user) {
        const existingVandor = await FindVandor(req.user._id);
        if (existingVandor) {
            existingVandor.name = name;
            existingVandor.address = address;
            existingVandor.phone = phone;
            existingVandor.foodType = foodTypes;
            
            const saveResult = await existingVandor.save();
            return res.json(saveResult);

        }
        return res.json(existingVandor);
    } 

    return res.json({operation:'error','message':'vandor not found'});
}


export const UpdateVandorCoverImage = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {

        const vandor = await FindVandor(req.user._id);
        if (vandor) {

            const files = req.files as [Express.Multer.File];
            const images = files.map((file: Express.Multer.File) => file.filename);

            vandor.coverImages.push(...images);
            const result = await vandor.save();

            return res.json(result);
        }
    } 

    return res.json({operation:'error','message':'vandor not found'});
}

export const updateVandorService = async (req: Request, res: Response, next: NextFunction) => {
    
    if (req.user) {
        const existingVandor = await FindVandor(req.user._id);
        if (existingVandor) {
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            const saveResult = await existingVandor.save();
            return res.json(saveResult);

        }
        return res.json(existingVandor);
    } 

    return res.json({operation:'error','message':'vandor not found'});
}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => { 
    if (req.user) {

        const vandor = await FindVandor(req.user._id);
        if (vandor) {

            const files = req.files as [Express.Multer.File];
            const images = files.map((file: Express.Multer.File) => file.filename);

            const { name, description, price, category, readyTime, foodType } = <createFoodInput>req.body;

            const createdFood = await Food.create({
                vendorID: req.user._id,
                name: name,
                description: description,
                price: price,
                category: category,
                readyTime: readyTime,
                foodType: foodType,
                images: images,
                rating: 0
            });

            vandor.foods.push(createdFood);
            const result = await vandor.save();

            return res.json(result);
        }
    } 

    return res.json({operation:'error','message':'vandor not found'});
}
export const GetFoods = async (req: Request, res: Response, next: NextFunction) => { 
    if (req.user) {
        const foods = await Food.find({ vendorID: req.user._id });
        if (foods) {
            return res.json(foods);
        }
    } 

    return res.json({operation:'error','message':'vandor not found'});
}