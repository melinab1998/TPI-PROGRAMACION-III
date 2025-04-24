import {User} from "../models/User.js"

export const createUser = async (req, res) => {

    try {
        const { first_name, last_name, email, birth_date, mobile, password, address, role } = req.body;

        const newUser = await User.create({
            first_name, last_name, email, birth_date, mobile, password, address, role
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating an user." });
    }

};