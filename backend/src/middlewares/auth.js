import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
	const header = req.header("Authorization");

	if (!header) {
		return res.status(401).json({ message: "No tiene la autorizacion requerida" });
	}

	const token = header.split(" ")[1];
	console.log("Token extraído:", token);

	if (!token) {
		return res.status(401).json({ message: "No tiene la autorizacion requerida" });
	}

	try {
		const payload = jwt.verify(token, process.env.SECRETKEY);
		console.log("Payload decodificado:", payload);

		req.user = payload; 

		next();
	} catch (error) {
		return res.status(403).json({ message: "No posee los permisos necesarios" });
	}
};

export const authorizeRoles = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(401).json({ message: "No autenticado" });
		}

		if (!allowedRoles.includes(req.user.role)) {
			return res.status(403).json({ message: "No tiene permisos suficientes" });
		}

		next();
	};
};