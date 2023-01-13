import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import { AdminRoute, VandorRoute } from "./routes";
import { MONGO_URI } from "./config";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


mongoose.connect( MONGO_URI)
.then(result => console.log('DB connected'))
.catch (error => console.error('error'+error))

app.use('/admin',AdminRoute);
app.use('/vendor',VandorRoute);

app.listen(8000, () => {
    console.clear();
    console.log('app is listing to port 8000');
})