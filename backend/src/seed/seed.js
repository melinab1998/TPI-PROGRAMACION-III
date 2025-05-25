import sequelize from "../config/db.js";
import User from "../models/User.js";
import Pet from "../models/Pet.js";
import Request from "../models/Request.js";
import initModels from "../models/init.models.js";
import faker from "faker";

async function seed() {
	try {
		initModels();
		await sequelize.authenticate();
		console.log("Conexión establecida correctamente.");

		// Limpiar tablas por si quedo informacion
		await Request.destroy({ where: {} });
		await Pet.destroy({ where: {} });
		await User.destroy({ where: {} });

		// Crear usuarios
		const userData = [];
		for (let i = 1; i <= 20; i++) {
			userData.push({
				user_name: faker.name.findName(),
				email: `user${i}@example.com`,
				password: "123456",
				role: i === 1 ? "admin" : "user",
			});
		}
		const users = await User.bulkCreate(userData, { returning: true });

		// Crear mascotas
		const petSpecies = ["Perro", "Gato"];
		const petDogRaces = [
			"Labrador",
			"Bulldog",
			"Golden",
			"Mestizo",
			"Dálmata",
			"Boxer",
			"Siberiano",
		];
		const petCatRaces = [
			"Siames",
			"Persa",
			"Angora",
			"Mestizo",
			"Siberiano",
			"Bengalí",
			"Bombay",
		];
		const petGenders = ["Macho", "Hembra"];
		const petData = [];
		for (let i = 1; i <= 20; i++) {
			const species = faker.random.arrayElement(petSpecies);
			const gender = faker.random.arrayElement(petGenders);
			const race =
				species === "Perro"
					? faker.random.arrayElement(petDogRaces)
					: faker.random.arrayElement(petCatRaces);
			petData.push({
				name: faker.name.firstName(),
				species,
				race,
				age: faker.datatype.number({ min: 1, max: 12 }),
				weight: faker.datatype.number({ min: 3, max: 40 }),
				gender,
				description: faker.lorem.sentence(),
				shelter: faker.company.companyName(),
				image_url: `https://placekitten.com/200/${300 + i}`,
			});
		}
		const pets = await Pet.bulkCreate(petData, { returning: true });

		// Crear solicitudes
		const requestStates = ["Pendiente", "Aprobada", "Rechazada", "En revisión"];
		const requestData = [];
		for (let i = 0; i < 20; i++) {
			const user = users[i];
			const pet = pets[i];
			requestData.push({
				id_pet: pet.id_pet,
				id_user: user.id_user,
				name: user.user_name.split(" ")[0],
				last_name: user.user_name.split(" ")[1] || "Apellido",
				address: faker.address.streetAddress(),
				phone: faker.phone.phoneNumber(),
				city: faker.address.city(),
				province: faker.address.state(),
				dni: faker.datatype.number({ min: 10000000, max: 99999999 }).toString(),
				housing_type: faker.random.arrayElement(["Casa", "Departamento"]),
				ownership_status: faker.random.arrayElement([
					"Propietario",
					"Inquilino",
				]),
				owner_consultation: faker.random.arrayElement(["Sí", "No"]),
				has_courtyard: faker.datatype.boolean(),
				has_pets: faker.datatype.boolean(),
				pets_neutered: faker.random.arrayElement(["Sí", "No", "N/A"]),
				had_other_pets: faker.datatype.boolean(),
				reason: faker.lorem.sentence(),
				vacation_plan: faker.lorem.sentence(),
				moving_plan: faker.lorem.sentence(),
				daily_walks: faker.datatype.number({ min: 0, max: 3 }).toString(),
				whatsapp_follow_up: faker.datatype.boolean(),
				terms_accepted: true,
				state: faker.random.arrayElement(requestStates),
			});
		}
		await Request.bulkCreate(requestData);

		console.log("Datos de prueba insertados correctamente.");
		process.exit(0);
	} catch (error) {
		console.error("Error al insertar datos de prueba:", error);
		process.exit(1);
	}
}

seed();
