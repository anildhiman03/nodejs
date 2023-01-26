import express, { NextFunction, Request, Response } from 'express';
import { AddFood, GetFoods, GetVandorProfile, UpdateVandorCoverImage, UpdateVandorProfile, updateVandorService, VandorLogin } from '../controllers';
import { Authentication } from '../middlewares';
import multer from 'multer';


const router = express.Router();

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '_' +file.originalname)
    }
})

const images = multer({ storage: imageStorage }).array('images', 10);

router.post('/login', VandorLogin);

router.use(Authentication);

router.get('/profile', GetVandorProfile);
router.patch('/profile', UpdateVandorProfile);
router.patch('/service', updateVandorService);
router.get('/foods', GetFoods);


router.use(images); // we can use this as middleware also
router.post('/food', AddFood);
router.patch('/cover-image', UpdateVandorCoverImage);

router.get('/',(req:Request, res: Response, next: NextFunction) => {
    return res.send({message:'Vendor Routes Hello Worlds'});
})

export {router as VandorRoute}