import express, { Request, Response, NextFunction } from 'express';
import { GetFoodAvailibility, GetFoodIn30Min, GetTopRestaurants, RestaurantById, SearchFood } from '../controllers';

const router = express.Router();

/*------------------------ Food Availability ------------------------*/
router.get("/:pincode", GetFoodAvailibility)
/*------------------------ Top Restaurants ------------------------*/
router.get("/top-restaurants/:pincode", GetTopRestaurants)
/*------------------------ Food Available in 30 Min ------------------------*/
router.get("/food-in-30-min/:pincode", GetFoodIn30Min)
/*------------------------ Search Foods ------------------------*/
router.get("/search/:pincode",SearchFood)
/*------------------------ Find Restaurant by ID ------------------------*/
router.get("/restaurant/:id", RestaurantById)

export {router as ShoppingRoute}