import Pet from "../models/Pet.js";
import Request  from "../models/Request.js";

export const getStats = async() =>{
    const petsInAdoption = await Pet.count({where:{adopted: false}});
    const pendingRequests = await Request.count({where:{state: 'pendiente'}});
    const successfulAdoptions = await Request.count({where:{state: 'Aprobada'}});

    return{
        petsInAdoption,
        pendingRequests,
        successfulAdoptions
    };
};