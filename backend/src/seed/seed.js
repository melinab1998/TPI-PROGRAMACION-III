import sequelize from "../config/db.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import Request from "../models/Request.js";
import initModels from "../models/init.models.js";

async function seed() {
	try {
		// Inicializar relaciones
		initModels();
		// Conectar a la base de datos
		await sequelize.authenticate();
		console.log("Conexión establecida correctamente.");

		// Limpiar tablas (opcional, cuidado en producción)
		await Request.destroy({ where: {} });
		await Pet.destroy({ where: {} });
		await User.destroy({ where: {} });

		// Crear usuarios
		const users = await User.bulkCreate(
			[
				{
					user_name: "Juan Perez",
					email: "juan@example.com",
					password: "1234",
					role: "user",
				},
				{
					user_name: "Ana Admin",
					email: "ana@example.com",
					password: "admin",
					role: "admin",
				},
			],
			{ returning: true }
		);

		// Crear mascotas
		const pets = await Pet.bulkCreate(
			[
				{
					name: "Firulais",
					species: "Perro",
					race: "Labrador",
					age: 3,
					weight: 25,
					gender: "Macho",
					description: "Perro juguetón",
					shelter: "Refugio Patitas",
					image_url: "https://placekitten.com/200/300",
				},
				{
					name: "Mishi",
					species: "Gato",
					race: "Siames",
					age: 2,
					weight: 5,
					gender: "Hembra",
					description: "Gata tranquila",
					shelter: "Refugio Gatitos",
					image_url: "https://placekitten.com/200/301",
				},
			],
			{ returning: true }
		);

		// Crear solicitudes
		await Request.bulkCreate([
			{
				id_pet: pets[0].id_pet,
				id_user: users[0].id_user,
				name: "Juan",
				last_name: "Perez",
				address: "Calle Falsa 123",
				phone: "123456789",
				city: "Rosario",
				province: "Santa Fe",
				dni: "12345678",
				housing_type: "Casa",
				ownership_status: "Propietario",
				owner_consultation: "No",
				has_courtyard: true,
				has_pets: false,
				pets_neutered: "N/A",
				had_other_pets: true,
				reason: "Quiero adoptar un amigo.",
				vacation_plan: "Lo dejo con familia.",
				moving_plan: "No planeo mudarme.",
				daily_walks: "2",
				whatsapp_follow_up: true,
				terms_accepted: true,
				state: "Pendiente",
			},
			{
				id_pet: pets[1].id_pet,
				id_user: users[1].id_user,
				name: "Ana",
				last_name: "Admin",
				address: "Av. Siempre Viva 742",
				phone: "987654321",
				city: "Otra Ciudad",
				province: "Otra Provincia",
				dni: "87654321",
				housing_type: "Departamento",
				ownership_status: "Inquilino",
				owner_consultation: "Sí",
				has_courtyard: false,
				has_pets: true,
				pets_neutered: "Sí",
				had_other_pets: false,
				reason: "Me encantan los gatos.",
				vacation_plan: "Viaja conmigo.",
				moving_plan: "No planeo mudarme.",
				daily_walks: "0",
				whatsapp_follow_up: false,
				terms_accepted: true,
				state: "Pendiente",
			},
		]);

		console.log("Datos de prueba insertados correctamente.");
		process.exit(0);
	} catch (error) {
		console.error("Error al insertar datos de prueba:", error);
		process.exit(1);
	}
}

seed();
