import Donation from "../models/Donation.js";
import {
	validateName,
	validateEmail,
	validateAmount,
	validatePaymentMethod,
} from "../helpers/validations.js";

export const createDonation = async (req, res) => {
	try {
		const { name, amount, email, payment_method, message } = req.body;

		const nameError = validateName(name);
		const emailError = validateEmail(email);
		const amountError = validateAmount(amount);
		const paymentMethodError = validatePaymentMethod(payment_method);

		const errors = {
			...(nameError && { name: nameError }),
			...(emailError && { email: emailError }),
			...(amountError && { amount: amountError }),
			...(paymentMethodError && { payment_method: paymentMethodError }),
		};

		if (Object.keys(errors).length > 0) {
			return res.status(400).json({
				error: "validation_error",
				message: "Error de validación en los datos proporcionados",
				details: errors,
			});
		}

		const newDonation = await Donation.create({
			name,
			amount,
			email,
			payment_method,
			message,
		});

		res.status(201).json(newDonation);
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			return res.status(409).json({
				error: "database_error",
				message: error.errors.map((e) => e.message).join(", "),
			});
		}

		res.status(500).json({
			error: "server_error",
			message: "Error al hacer la donación",
			details: error.message,
		});
	}
};