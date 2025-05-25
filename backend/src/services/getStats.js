import Pet from "../models/Pet.js";
import Request from "../models/Request.js";

export const getStats = async (req, res) => {
    try {
        const petsInAdoption = await Pet.count({ where: { adopted: false } });
        const pendingRequests = await Request.count({ where: { state: 'Pendiente' } });
        const successfulAdoptions = await Request.count({ where: { state: 'Aprobada' } });

        res.json({
            petsInAdoption,
            pendingRequests,
            successfulAdoptions
        });
    } catch (error) {
        res.status(500).json({
            error: "server_error",
            message: "Error al obtener estadísticas del dashboard.",
            details: error.message
        });
    }
};
