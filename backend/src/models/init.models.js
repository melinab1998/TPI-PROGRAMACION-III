import User from "./User.js";
import Pet from "./Pet.js";
import Request from "./Request.js";

// En este archivo van todas las relaciones de los modelos
function initModels() {
	Pet.hasMany(Request, { foreignKey: "id_pet" });
	Request.belongsTo(Pet, { foreignKey: "id_pet" });

	User.hasMany(Request, { foreignKey: "id_user" });
	Request.belongsTo(User, { foreignKey: "id_user" });
}

export default initModels;
