import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {
	validateEmail,
	validatePassword,
	validatePasswordLogin,
	validateUserName,
} from "../helpers/validations.js"
dotenv.config();

export const createUser = async (req, res) => {
	try {
		const { user_name, email, password, role } = req.body;

		const errorName = validateUserName(user_name);
		if (errorName) return res.status(400).json({ message: errorName });

		const errorEmail = validateEmail(email);
		if (errorEmail) return res.status(400).json({ message: errorEmail });

		const errorPassword = validatePassword(password);
		if (errorPassword) return res.status(400).json({ message: errorPassword });

		const existingEmail = await User.findOne({ where: { email } });
		if (existingEmail) {
			return res.status(409).json({
				message: "El email ya está registrado",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			user_name,
			email,
			password: hashedPassword,
			role,
		});

		res.status(201).json({
			message: "Usuario creado con éxito",
			user: newUser,
		});
	} catch (error) {
		console.error("Error al crear usuario:", error);

		if (error.name === "SequelizeUniqueConstraintError") {
			return res.status(409).json({
				message: "Error en la base de datos: email ya registrado",
			});
		}

		res.status(500).json({
			message: "Hubo un error al crear el usuario. Intenta nuevamente más tarde.",
		});
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const errorEmail = validateEmail(email);
		if (errorEmail) return res.status(400).json({ message: errorEmail });

		const errorPassword = validatePasswordLogin(password);
		if (errorPassword) return res.status(400).json({ message: errorPassword });

		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(401).json({ message: "Email y/o contraseña incorrecta" });
		}

		const comparison = await bcrypt.compare(password, user.password);
		if (!comparison) {
			return res.status(401).json({ message: "Email y/o contraseña incorrecta" });
		}

		const token = jwt.sign(
			{
				id_user: user.id_user,
				email: user.email,
				role: user.role,
				user_name: user.user_name,
			},
			process.env.SECRETKEY,
			{ expiresIn: "20h" }
		);

		return res.status(200).json({
			message: "Inicio de sesión exitoso",
			user_name: user.user_name,
			token,
		});
	} catch (error) {
		console.error("Error en el login:", error);
		return res.status(500).json({ message: "Error interno en el inicio de sesión" });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		await user.destroy();
		return res.status(200).json({ message: "Usuario eliminado correctamente" });
	} catch (error) {
		console.error("Error al eliminar usuario:", error);
		return res
			.status(500)
			.json({ message: "Error interno al eliminar el usuario" });
	}
};

const validRoles = ["admin", "user", "superadmin"]; 

export const updateUserRole = async (req, res) => {
	try {
		const { id } = req.params;
		const { role } = req.body;

		if (!validRoles.includes(role)) {
			return res.status(400).json({ message: "Rol inválido" });
		}

		const user = await User.findByPk(id);
		if (!user) {
			return res.status(404).json({ message: "Usuario no encontrado" });
		}

		user.role = role;
		await user.save();

		return res.status(200).json({
			message: "Rol del usuario actualizado correctamente",
			user,
		});
	} catch (error) {
		console.error("Error al actualizar el rol del usuario:", error);
		return res
			.status(500)
			.json({ message: "Error interno al actualizar el rol del usuario" });
	}
};

export const getUsers = async (req, res) => {
	try {
		const users = await User.findAll({
			attributes: { exclude: ["password"] },
		});

		return res.status(200).json(users);
	} catch (error) {
		console.error("Error al obtener los usuarios:", error);
		return res
			.status(500)
			.json({ message: "Error interno al obtener los usuarios" });
	}
};
