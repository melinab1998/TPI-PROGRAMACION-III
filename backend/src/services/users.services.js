import { User } from "../models/User.js";

export const createUser = async (req, res) => {
    try {
        const { user_name, email, password, role } = req.body;

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(409).json({ 
                error: 'email_exists',
                message: 'El email ya está registrado' 
            });
        }

        const newUser = await User.create({
            user_name, email, password, role
        });
        
        res.status(201).json(newUser);
    } catch (error) {

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({
                error: 'database_error',
                message: error.errors.map(e => e.message).join(', ')
            });
        }

        res.status(500).json({ 
            error: 'server_error',
            message: "Error al crear el usuario" 
        });
    }
};