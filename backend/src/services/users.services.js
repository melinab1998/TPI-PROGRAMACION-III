import { User } from "../models/User.js";

export const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, birth_date, mobile, password, address, role } = req.body;

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(409).json({ 
                error: 'email_exists',
                message: 'El email ya está registrado' 
            });
        }

        const existingMobile = await User.findOne({ where: { mobile } });
        if (existingMobile) {
            return res.status(409).json({ 
                error: 'mobile_exists',
                message: 'El teléfono ya está registrado' 
            });
        }

        const newUser = await User.create({
            first_name, last_name, email, birth_date, mobile, password, address, role
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