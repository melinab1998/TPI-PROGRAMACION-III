import express from "express";
import sequelize from "./config/db.js";
import userRoutes from "./routes/users.routes.js";
import petsRoutes from "./routes/pets.routes.js";
import donationRoutes from "./routes/donations.routes.js";
import requestRoutes from "./routes/requests.routes.js";
import sheltersRoutes from "./routes/shelters.routes.js";
import contactRoutes from "./routes/contacts.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import cors from "cors";
import initModels from "./models/init.models.js";

const app = express();
const PORT = process.env.EX_PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

app.use(cors());
initModels(); // inicializa las relaciones entre modelos
app.use(userRoutes);
app.use(petsRoutes);
app.use(donationRoutes);
app.use(requestRoutes);
app.use(sheltersRoutes);
app.use(contactRoutes);
app.use(dashboardRoutes);

app.get("/", (req, res) => {
	res.send("Backend funcionando!");
});

app.listen(PORT, () => {
	console.log(`servidor corriendo en http://localhost:${PORT}`);
});

sequelize
	.authenticate()
	.then(() => {
		console.log("Conectado a la base de datos");
		sequelize
			.sync({ force: false })
			.then(() => {
				console.log("Sincronización exitosa");
			})
			.catch((err) => {
				console.error("Error al sincronizar la base de datos", err);
			});
	})
	.catch((err) => {
		console.error("Error al conectar a la base de datos", err);
	});
