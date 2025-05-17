import { Shelter } from "../models/Shelter.js"

export const getShelters = async (req, res) => {
    try {
        const shelters = await Shelter.findAll();
        res.json(shelters);
    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error al obtener los refugios." });
    }
};

export const getShelterById = async (req, res) => {
    try {
        const { id } = req.params;
        const shelter = await Shelter.findByPk(id);

        if (!shelter) {
            return res.status(404).json({ message: "Refugio no encontrado." });
        }

        res.json(shelter);
    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error al obtener el refugio." });
    }
};

export const createShelter = async (req, res) => {
    try {
        const { name, address, phone, email } = req.body;

        if ([name, address, phone, email].some(field => field === undefined || field === null)) {
            return res.status(400).json({
                error: "validation_error",
                message: "Faltan campos obligatorios.",
            });
        }

        const newShelter = await Shelter.create({
            name,
            address,
            phone,
            email
        });

        res.status(201).json({ message: "Refugio creado exitosamente.", newShelter });
    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error al crear el refugio." });
    }
};

export const updateShelter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone, email } = req.body;

        const shelter = await Shelter.findByPk(id);

        if (!shelter) {
            return res.status(404).json({ message: "Refugio no encontrado." });
        }

        await shelter.update({
            name,
            address,
            phone,
            email
        });

        res.status(200).json({ message: "Refugio actualizado exitosamente.", shelter });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el refugio." });
    }
};

export const deleteShelter = async (req, res) => {
    try {
        const { id } = req.params;

        const shelter = await Shelter.findByPk(id);

        if (!shelter) {
            return res.status(404).json({ message: "Refugio no encontrado." });
        }

        await shelter.destroy();

        res.status(200).json({ message: "Refugio eliminado exitosamente.", shelter });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el refugio." });
    }
};