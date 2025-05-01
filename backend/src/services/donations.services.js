import Donation from "../models/Donation.js";
export const createDonation = async (req, res) => {
	try {
	  const { name, amount, email, payment_method, message } = req.body;
  
	  if (!name || !email || !amount || !payment_method) {
		return res.status(400).json({
		  error: "validation_error",
		  message: "Faltan campos obligatorios.",
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
	  });
	}
  };
  