import { User } from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()




export const createUser = async (req, res) => {
    try {
        const { user_name, email, password, role } = req.body;

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(409).json({
                message: "El email ya está registrado"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await User.create({
            user_name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: "Usuario creado con éxito",
            user: newUser
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);


        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                message: "Error en la base de datos: email ya registrado"
            });
        }

        res.status(500).json({
            message: "Hubo un error al crear el usuario. Intenta nuevamente más tarde."
        });
    }
};


export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(401).json({ message: "Email y/o contraseña incorrecta" });
        }

        const comparison = await bcrypt.compare(password, user.password)

        if (!comparison) {
            return res.status(401).json({ message: "Email y/o contraseña incorrecta" })
        }
        const user_name = user.user_name;

        const secretKey = process.env.SECRETKEY

        const token = jwt.sign(
            {
                email: user.email,
                role: user.role,           
                user_name: user.user_name  
            },
            secretKey,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            user_name,
            token
        });

    } catch (error) {
        console.error("Error en el login:", error);
    }
};

