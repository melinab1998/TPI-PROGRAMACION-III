import Request from "../models/Request.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";

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

		/* 
				Arreglar
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
			!id_pet ||
			!housingType ||
			!ownershipStatus ||
			!hasCourtyard ||
			!hasPets ||
			!hadOtherPets ||
			!reason ||
			!vacationPlan ||
			!movingPlan ||
			!dailyWalks ||
			!whatsappFollowUp
		) {
			return res.status(400).json({ error: "Faltan campos obligatorios." });
		}
 */
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

export const getRequests = async (req, res) => {
	try {
		const request = await Request.findAll({
			include: [
				{
					model: User,
					attributes: ["user_name", "email"],
				},
				{
					model: Pet,
					attributes: ["name", "species", "race", "age", "gender", "shelter"],
				},
			],
		});
		res.json(request);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Ocurrió un error al obtener las requests." });
	}
};

export const updateRequests = async (req, res) => {
	try {
		const { id } = req.body;
		const { state } = req.body;

		const request = await Request.findByPk(id);

		if (!request) {
			return res
				.status(404)
				.json({ message: "Ocurrió un error al obtener la solicitud." });
		}

		await request.update({ state });
		return res
			.status(200)
			.json({ message: "Solicitud actualizada exitosamente.", request });
	} catch (error) {
		res.status(500).json({ message: "Error al actualizar la solicitud." });
	}
};
