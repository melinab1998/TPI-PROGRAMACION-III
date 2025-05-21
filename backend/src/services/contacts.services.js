import Contact from "../models/Contact";


export const createContact = async (req, res) =>{

    try{
        const {name, email, message} = req.body

        const newContact = await Contact.create({
            name, 
            email,
            message
        }
        );
        res.status(201).json({
			message: "Mensaje enviado con éxito",
			contact: newContact,
		});


    } catch(error){
        res.status(500).json({
			message: "Hubo un error al enviar el mensaje. Intenta nuevamente más tarde.",
		});
    }
}