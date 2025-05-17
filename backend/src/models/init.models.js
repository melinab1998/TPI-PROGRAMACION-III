import User from "./User.js";
import Pet from "./Pet.js";
import Request from "./Request.js";

// Relaciones
//Eso significa que una mascota puede tener muchas solicitudes
//Se puede hacer las relaciones en un archivo aparte, lo hice en un archivo
Pet.hasMany(Request, { foreignKey: "id_pet" });
Request.belongsTo(Pet, { foreignKey: "id_pet" });

User.hasMany(Request, { foreignKey: "id_user" });
Request.belongsTo(User, { foreignKey: "id_user" });

export { User, Pet, Request };
