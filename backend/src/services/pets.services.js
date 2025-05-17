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
           return res.status(404).json({ message: "Mascota no encontrada." });
        }
        res.json(pet)

    } catch (error) {
        res.status(500).json({ message: "Ocurrió un error al obtener la mascota." });
    }
}

export const createPet = async (req, res) => {
  
    try {
      const { name, species, race, age, weight, gender, description, shelter, adopted, imageUrl } = req.body;
  
      if ([name, species, race, age, weight, gender, description, shelter,imageUrl].some(campo => campo === undefined || campo === null)) {
        return res.status(400).json({
          error: "validation_error",
          message: "Faltan campos obligatorios.",
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
        adopted,  
        imageUrl
      });
  
      return res.status(201).json({ message: "Mascota creada exitosamente.", pet });
    } catch (error) {
      res.status(500).json({ message: "Ocurrió un error al crear la mascota." });
    }
  };

  export const updatePet = async(req, res) =>{
    try{
      const {id} = req.params
      const { name, species, race, age, weight, gender, description, shelter, adopted, imageUrl } = req.body;

      const pet = await Pet.findByPk(id);

      
      if(!pet){
        return res.status(404).json({ message: "Ocurrió un error al obtener la mascota." });
    }

       await pet.update({
        name, 
        species, 
        race, 
        age, 
        weight, 
        gender, 
        description, 
        shelter,
        adopted,  
        imageUrl
      })
      return res.status(200).json({ message: "Mascota actualizada exitosamente.", pet });

    }catch(error){
      res.status(500).json({ message: "Error al actualizar la mascota." });
    }
  }


export const deletePet = async(req, res) =>{
  const {id} = req.params
  try{
    const pet = await Pet.findByPk(id);
    if(!pet){
      return res.status(404).json({ message: "Mascota no encontrada." });
    }

    await pet.destroy();
    return res.status(200).json({ message: "Mascota eliminada exitosamente.", pet });


  }catch (error){
    res.status(500).json({ message: "Error al eliminar la mascota." });
  }
}