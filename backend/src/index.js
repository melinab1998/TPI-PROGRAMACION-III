import express from "express";
import sequelize from "./config/db.js";

const app = express();
const PORT = process.env.DB_PORT || 3000;

// Middleware para parsear JSON
// no olvidar de instalar morgan
app.use(express.json());

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