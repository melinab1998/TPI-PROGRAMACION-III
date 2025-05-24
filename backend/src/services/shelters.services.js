import Shelter from "../models/Shelter.js";
import {
  validateName,
  validateAddress,
  validatePhone,
  validateEmail
} from "../helpers/validations.js"

export const getAllShelters = async (req, res) => {
  try {
    const shelter = await Shelter.findAll();
    res.json(shelter);
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

    const validationErrors = {
      name: validateName(name),
      address: validateAddress(address),
      phone: validatePhone(phone),
      email: validateEmail(email)
    };

    const hasErrors = Object.values(validationErrors).some(error => error !== "");
    
    if (hasErrors) {
      return res.status(400).json({
        error: "validation_error",
        message: "Error de validación en los datos proporcionados",
        details: validationErrors,
      });
    }

    const newShelter = await Shelter.create({
      name, 
      address,
      phone, 
      email
    });

    return res.status(201).json({ 
      message: "Refugio creado con éxito.", 
      newShelter 
    });
  } catch (error) {
    console.error("Error al crear refugio:", error);
    res.status(500).json({ 
      message: "Ocurrió un error al crear el refugio.",
      error: error.message 
    });
  }
};

export const updateShelter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone, email } = req.body;

    const validationErrors = {
      name: validateName(name),
      address: validateAddress(address),
      phone: validatePhone(phone),
      email: validateEmail(email)
    };

    const hasErrors = Object.values(validationErrors).some(error => error !== "");
    
    if (hasErrors) {
      return res.status(400).json({
        error: "validation_error",
        message: "Error de validación en los datos proporcionados",
        details: validationErrors,
      });
    }

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

    return res.status(200).json({ 
      message: "Refugio actualizado con éxito.", 
      shelter 
    });
  } catch (error) {
    console.error("Error al actualizar refugio:", error);
    res.status(500).json({ 
      message: "Error al actualizar el refugio.",
      error: error.message
    });
  }
};

export const deleteShelter = async (req, res) => {
  const { id } = req.params;
  try {
    const shelter = await Shelter.findByPk(id);
    if (!shelter) {
      return res.status(404).json({ message: "Refugio no encontrado." });
    }

    await shelter.destroy();
    return res.status(200).json({ 
      message: "Refugio eliminado con éxito.", 
      shelter 
    });
  } catch (error) {
    console.error("Error al eliminar refugio:", error);
    res.status(500).json({ 
      message: "Error al eliminar el refugio.",
      error: error.message
    });
  }
};