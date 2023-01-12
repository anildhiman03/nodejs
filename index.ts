import express from "express";
import { AdminRoute, VandorRoute } from "./routes";
const app = express();

app.use('/admin',AdminRoute);
app.use('/vendor',VandorRoute);

app.listen(8000, () => {
    console.clear();
    console.log('app is listing to port 8000');
})