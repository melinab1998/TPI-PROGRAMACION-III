import Request from "../models/Request.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import {
	validateName,
	validateLastName,
	validateAddress,
	validatePhone,
	validateCity,
	validateProvince,
	validateDNI,
	validateHousingType,
	validateOwnershipStatus,
	validateOwnerConsultation,
	validateCourtyard,
	validateHasPets,
	validatePetsNeutered,
	validateHadOtherPets,
	validateReason,
	validateVacationPlan,
	validateMovingPlan,
	validateDailyWalks,
	validateWhatsappFollowUp,
	validateTerms,
} from "../helpers/validations.js";
import { where } from "sequelize";

export const createRequest = async (req, res) => {
	try {
		console.log(req.body);

		const {
			id_user,
			id_pet,
			name,
			last_name,
			address,
			phone,
			city,
			province,
			dni,
			housing_type,
			ownership_status,
			owner_consultation,
			has_courtyard,
			has_pets,
			pets_neutered,
			had_other_pets,
			reason,
			vacation_plan,
			moving_plan,
			daily_walks,
			whatsapp_follow_up,
			terms_accepted,
		} = req.body;

		const validationErrors = {
			name: validateName(name),
			last_name: validateLastName(last_name),
			address: validateAddress(address),
			phone: validatePhone(phone),
			city: validateCity(city),
			province: validateProvince(province),
			dni: validateDNI(dni),
			housing_type: validateHousingType(housing_type),
			ownership_status: validateOwnershipStatus(ownership_status),
			owner_consultation: validateOwnerConsultation(owner_consultation, ownership_status === "tenant"),
			has_courtyard: validateCourtyard(has_courtyard),
			has_pets: validateHasPets(has_pets),
			pets_neutered: validatePetsNeutered(pets_neutered, has_pets),
			had_other_pets: validateHadOtherPets(had_other_pets),
			reason: validateReason(reason),
			vacation_plan: validateVacationPlan(vacation_plan),
			moving_plan: validateMovingPlan(moving_plan),
			daily_walks: validateDailyWalks(daily_walks),
			whatsapp_follow_up: validateWhatsappFollowUp(whatsapp_follow_up),
			terms_accepted: validateTerms(terms_accepted),
		};

		const hasErrors = Object.values(validationErrors).some(error => error !== "");

		if (hasErrors) {
			return res.status(400).json({
				error: "validation_error",
				message: "Error de validación en los datos proporcionados",
				details: validationErrors,
			});
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
			last_name,
			address,
			phone,
			city,
			province,
			dni,
			housing_type,
			ownership_status,
			owner_consultation,
			has_courtyard,
			has_pets,
			pets_neutered,
			had_other_pets,
			reason,
			vacation_plan,
			moving_plan,
			daily_walks,
			whatsapp_follow_up,
			terms_accepted,
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
		
		if(state === "Aprobada"){
			await Pet.update(
				{adopted: true},
				{where:{id_pet: request.id_pet}}
			);
		}

		return res
			.status(200)
			.json({ message: "Solicitud actualizada con éxito.", request });
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: "Error al actualizar la solicitud." });
	}
};
