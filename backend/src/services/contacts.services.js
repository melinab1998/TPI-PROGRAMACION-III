import Contact from "../models/Contact.js";
import { validateMessage, validateName, validateEmail } from "../helpers/validations.js";

export const createContact = async (req, res) => {
	try {
		const { name, email, message } = req.body;

		const nameError = validateName(name);
		const emailError = validateEmail(email);
		const messageError = validateMessage(message);

		const errors = {
			...(nameError && { name: nameError }),
			...(emailError && { email: emailError }),
			...(messageError && { message: messageError }),
		};

		if (Object.keys(errors).length > 0) {
			return res.status(400).json({
				error: "validation_error",
				message: "Error de validación en los datos proporcionados",
				details: errors,
			});
		}

		const newContact = await Contact.create({ name, email, message });

		res.status(201).json({
			message: "Mensaje enviado con éxito",
			contact: newContact,
		});
	} catch (error) {
		console.error("Error en createContact:", error);
		res.status(500).json({
			message: "Hubo un error al enviar el mensaje. Intenta nuevamente más tarde.",
		});
	}
};