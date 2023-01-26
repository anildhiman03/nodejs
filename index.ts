import express from "express";
import App from "./services/ExpressApp";
import Database from "./services/Database";


const Server = async () => {
    const app = express();
    
    await Database();
    await App(app);

    app.listen(8000, () => {
        // console.clear();
        console.log('app is listing to port 8000');
    }) 
}

Server();