import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
	try {
		console.log(req.body);

		const {
			id_user,
			id_pet,
			name,
			lastname,
			address,
			phone,
			city,
			province,
			dni,
			housingType,
			ownershipStatus,
			ownerConsultation,
			hasCourtyard,
			hasPets,
			petsNeutered,
			hadOtherPets,
			reason,
			vacationPlan,
			movingPlan,
			dailyWalks,
			whatsappFollowUp,
			termsAccepted,
		} = req.body;

		// Validación de campos obligatorios
		if (
			!name ||
			!lastname ||
			!address ||
			!phone ||
			!city ||
			!province ||
			!dni ||
			termsAccepted !== true ||
			!id_user ||
			!id_pet
		) {
			return res.status(400).json({ error: "Faltan campos obligatorios." });
		}

		const existingRequest = await Request.findOne({
			where: {
				id_user,
				id_pet,
			},
		});

		if (existingRequest) {
			return res.status(409).json({
				error: "Ya existe una solicitud de este usuario para esta mascota.",
			});
		}

		const newRequest = await Request.create({
			id_user,
			id_pet,
			name,
			lastname,
			address,
			phone,
			city,
			province,
			dni,
			housingType,
			ownershipStatus,
			ownerConsultation,
			hasCourtyard,
			hasPets,
			petsNeutered,
			hadOtherPets,
			reason,
			vacationPlan,
			movingPlan,
			dailyWalks,
			whatsappFollowUp,
			termsAccepted,
		});

		res.status(201).json(newRequest);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "server_error",
			message: "Error al crear la solicitud",
		});
	}
};
