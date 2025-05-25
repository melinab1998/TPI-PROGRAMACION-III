import Pet from "../models/Pet.js";
import Request  from "../models/Request.js";

export const getStats = async(req, res) =>{
    try{
        const petsInAdoption = await Pet.count({where:{adopted: false}});
        
    }
}