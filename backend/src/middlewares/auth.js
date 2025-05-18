import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
	const header = req.header("Authorization");

	if (!header) {
		return res.status(401).json({ message: "No tiene autorizacion requerida" });
	}

	const token = header.split(" ")[1];

	if (!token) {
		return res.status(401).json({ message: "No tiene autorizacion requerida" });
	}

	try {
		const payload = jwt.verify(token, process.env.SECRETKEY);
		console.log(payload);

		next();
	} catch (error) {
		return res.status(403).json({ message: "No posee permisos correctos" });
	}
};
