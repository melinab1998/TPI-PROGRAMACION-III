import {Users} from "../models/Users.js"

export const createUser = async (req, res) => {
    try {
        const { name, lastName, email, age, mobile, password, address, role} = req.body;

        const newUser = await Users.create({
            name, lastName, email, age, mobile, password, address, role
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating an user." });
    }
};