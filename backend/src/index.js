import express from "express";
import sequelize from "./config/db.js";


const app = express();
const PORT = 5342 || 3000;

app.listen(PORT, () => {
    console.log("hurra");
    
} );

sequelize.authenticate()
.then(() => {
    console.log("sincroniadp");
    
})


