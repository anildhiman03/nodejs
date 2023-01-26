import { NextFunction, Request, Response } from "express";
import { FoodDoc, Vandor } from "../models";

export const GetFoodAvailibility = async (req: Request, res: Response, next: NextFunction) => { 
    
    const result = await Vandor.find({ pincode: req.params.pincode, serviceAvailable: false })
        .sort([['rating', 'descending']])
        .populate("foods")
    
    if (result.length > 0) {
        return res.status(200).json(result);
    }

    return res.status(400).json({ message: "data not found" });
}

export const GetTopRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    const result = await Vandor.find({ pincode: req.params.pincode, serviceAvailable: false })
        .sort([['rating', 'descending']])
        .limit(10)
    
    if (result.length > 0) {
        return res.status(200).json(result);
    }

    return res.status(400).json({ message: "data not found" });
}
 

export const GetFoodIn30Min = async (req: Request, res: Response, next: NextFunction) => {
    
    const result = await Vandor.find({ pincode: req.params.pincode, serviceAvailable: false })
        .populate('foods')
    
    if (result.length > 0) {
        
        let foodResult:any = [];

        result.map(vandor => {
            const foods = vandor.foods as [FoodDoc];
            foodResult.push(...foods.filter(food => food.readyTime < 30));
        })
        return res.status(200).json(foodResult);
    }

    return res.status(400).json({ message: "data not found" });
}
 
export const SearchFood = async (req: Request, res: Response, next: NextFunction) => { 
    
    const result = await Vandor.find({ pincode: req.params.pincode, serviceAvailable: false })
        .populate('foods')
    
    if (result.length > 0) {
        
        let foodResult:any = [];

        result.map(items => foodResult.push(...items.foods));

        return res.status(200).json(foodResult);
    }

    return res.status(400).json({ message: "data not found" });

}

export const RestaurantById = async (req: Request, res: Response, next: NextFunction) => { 
    
    const result = await Vandor.findById(req.params.id);

    if (result) {
        return res.status(200).json(result);
    }

    return res.status(400).json({ message: "data not found" });

}
