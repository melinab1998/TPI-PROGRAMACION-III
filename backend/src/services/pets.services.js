import { Pet } from "../models/Pet.js";
import {
  validateName,
  validateSpecies,
  validateRace,
  validateAge,
  validateWeight,
  validateGender,
  validateShelter,
  validateImageUrl
} from "../helpers/validations.js"

export const getPets = async (req, res) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ 
      error: "server_error",
      message: "Ocurrió un error al obtener las mascotas.",
      details: error.message 
    });
  }
};

export const getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByPk(id); 
    
    if (!pet) {
      return res.status(404).json({ 
        error: "not_found",
        message: "Mascota no encontrada." 
      });
    }
    res.json(pet);  
  } catch (error) {
    res.status(500).json({ 
      error: "server_error",
      message: "Ocurrió un error al obtener la mascota.",
      details: error.message 
    });
  }
};

export const createPet = async (req, res) => {
  try {
    const { 
      name, 
      species, 
      race, 
      age, 
      weight, 
      gender, 
      description, 
      shelter, 
      adopted, 
      image_url
    } = req.body;

    const errors = {
      ...(validateName(name) && { name: validateName(name) }),
      ...(validateSpecies(species) && { species: validateSpecies(species) }),
      ...(validateRace(race) && { race: validateRace(race) }),
      ...(validateAge(age) && { age: validateAge(age) }),
      ...(validateWeight(weight) && { weight: validateWeight(weight) }),
      ...(validateGender(gender) && { gender: validateGender(gender) }),
      ...(validateShelter(shelter) && { shelter: validateShelter(shelter) }),
      ...(validateImageUrl(image_url) && { image_url: validateImageUrl(image_url) }),
    };

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "validation_error",
        message: "Error de validación en los datos proporcionados",
        details: errors
      });
    }

    const newPet = await Pet.create({
      name, 
      species, 
      race, 
      age, 
      weight, 
      gender, 
      description,
      shelter,
      adopted: adopted || false, 
      image_url
    });

    return res.status(201).json({ 
      message: "Mascota creada con éxito.", 
      pet: newPet 
    });
  } catch (error) {
    res.status(500).json({ 
      error: "server_error",
      message: "Ocurrió un error al crear la mascota.",
      details: error.message 
    });
  }
};

export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      name, 
      species, 
      race, 
      age, 
      weight, 
      gender, 
      description, 
      shelter, 
      adopted, 
      image_url
    } = req.body;

    const pet = await Pet.findByPk(id);
    
    if (!pet) {
      return res.status(404).json({ 
        error: "not_found",
        message: "Mascota no encontrada." 
      });
    }

    const errors = {
      ...(name && validateName(name) && { name: validateName(name) }),
      ...(species && validateSpecies(species) && { species: validateSpecies(species) }),
      ...(race && validateRace(race) && { race: validateRace(race) }),
      ...(age && validateAge(age) && { age: validateAge(age) }),
      ...(weight && validateWeight(weight) && { weight: validateWeight(weight) }),
      ...(gender && validateGender(gender) && { gender: validateGender(gender) }),
      ...(shelter && validateShelter(shelter) && { shelter: validateShelter(shelter) }),
      ...(image_url && validateImageUrl(image_url) && { image_url: validateImageUrl(image_url) }),
    };

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "validation_error",
        message: "Error de validación en los datos proporcionados",
        details: errors
      });
    }

    await pet.update({
      name: name || pet.name,
      species: species || pet.species,
      race: race || pet.race,
      age: age !== undefined ? age : pet.age,
      weight: weight !== undefined ? weight : pet.weight,
      gender: gender || pet.gender,
      description: description || pet.description,
      shelter: shelter || pet.shelter,
      adopted: adopted !== undefined ? adopted : pet.adopted,
      image_url: image_url || pet.image_url
    });

    return res.status(200).json({ 
      message: "Mascota actualizada con éxito.", 
      pet 
    });
  } catch (error) {
    res.status(500).json({ 
      error: "server_error",
      message: "Error al actualizar la mascota.",
      details: error.message 
    });
  }
};

export const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findByPk(id);
    
    if (!pet) {
      return res.status(404).json({ 
        error: "not_found",
        message: "Mascota no encontrada." 
      });
    }

    await pet.destroy();
    return res.status(200).json({ 
      message: "Mascota eliminada con éxito.", 
      pet 
    });
  } catch (error) {
    res.status(500).json({ 
      error: "server_error",
      message: "Error al eliminar la mascota.",
      details: error.message 
    });
  }
};