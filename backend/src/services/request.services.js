import Request from "../models/Request.js";

export const createRequest = async (req, res) => {
	try {
		const {
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
			id_user,
			id_pet
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
		
        const existingRequest = await Requests.findOne({
			where: {
				id_user,
				id_pet
			}
		});

		if (existingRequest) {
			return res.status(409).json({ error: "Ya existe una solicitud de este usuario para esta mascota." });
		}

		const newRequest = await Request.create({
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
			id_user,
			id_pet
		});

		res.status(201).json(newRequest);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: "server_error",
			message: "Error al crear la solicitud"
		});
	}
};