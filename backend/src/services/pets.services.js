import {Pet} from "../models/Pet.js";

export const getPets = async (req, res) => {
    try {
        const pet = await Pet.findAll();
        res.json(pet);

    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error al obtener las mascotas." });
    }
}

export const getPetById = async (req, res) => {
    try {
        const {id} = req.params
        const pet = await Pet.findByPk(id)
        if(!pet){
            res.status(404).json({ message: "Ocurrió un error al obtener la mascota." });
        }
        res.json(pet)

    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error al obtener la mascota." });
    }
}