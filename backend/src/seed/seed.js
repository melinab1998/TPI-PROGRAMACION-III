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

		// Limpiar tablas por si quedo informacion
		await Request.destroy({ where: {} });
		await Pet.destroy({ where: {} });
		await User.destroy({ where: {} });

		// Crear usuarios
		const userData = [];
		for (let i = 1; i <= 50; i++) {
			userData.push({
				user_name: faker.name.findName(),
				email: `user${i}@example.com`,
				password:
					"$2b$10$vv2O23cP1zGj9Bamz1lFqes2aEojRV9jY0bPjiM809IfviCZuFW0m",
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
		const catImages = [
			"https://cdn2.thecatapi.com/images/12j.jpg",
			"https://cdn2.thecatapi.com/images/40b.jpg",
			"https://cdn2.thecatapi.com/images/7lf.jpg",
			"https://cdn2.thecatapi.com/images/8fr.png",
			"https://cdn2.thecatapi.com/images/bp3.jpg",
			"https://cdn2.thecatapi.com/images/cg6.jpg",
			"https://cdn2.thecatapi.com/images/dql.jpg",
			"https://cdn2.thecatapi.com/images/5s7.jpg",
			"https://cdn2.thecatapi.com/images/6i8.jpg",
			"https://cdn2.thecatapi.com/images/MjA1MTUwOQ.jpg",
			"https://cdn2.thecatapi.com/images/EzYYrmFp7.jpg",
			"https://cdn2.thecatapi.com/images/agwTe5TSe.jpg",
			"https://cdn2.thecatapi.com/images/1rq.jpg",
			"https://28.media.tumblr.com/tumblr_lt95ovYgPG1r4xjo2o1_1280.jpg",
			"https://cdn2.thecatapi.com/images/2fs.jpg",
			"https://cdn2.thecatapi.com/images/7t0.jpg",
			"https://cdn2.thecatapi.com/images/b79.jpg",
			"https://cdn2.thecatapi.com/images/buh.jpg",
			"https://cdn2.thecatapi.com/images/cno.jpg",
		];
		for (let i = 1; i <= 50; i++) {
			const species = faker.random.arrayElement(petSpecies);
			const gender = faker.random.arrayElement(petGenders);
			const race =
				species === "Perro"
					? faker.random.arrayElement(petDogRaces)
					: faker.random.arrayElement(petCatRaces);
			const image_url =
				species === "Perro"
					? `https://placedog.net/350/250?id=${i}`
					: catImages[Math.floor(Math.random() * catImages.length)];
			petData.push({
				name: faker.name.firstName(),
				species,
				race,
				age: faker.datatype.number({ min: 1, max: 12 }),
				weight: faker.datatype.number({ min: 3, max: 40 }),
				gender,
				description: faker.lorem.sentence(),
				shelter: faker.company.companyName(),
				image_url,
			});
		}
		const pets = await Pet.bulkCreate(petData, { returning: true });

		// Crear solicitudes
		const requestStates = ["Pendiente", "Rechazada", "En revisión"];
		const requestData = [];
		for (let i = 0; i < 50; i++) {
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
