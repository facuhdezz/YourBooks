const usersModels = require("../models/usersModels");
const jwt = require("jsonwebtoken");
const secret = 'secreta clave';

const getUsers = async (req, res) => {
    const users = await usersModels.getUsers();
    res.json(users);
};

const getUserByEmail = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await usersModels.getUserByEmail(req.params.email);
    if(user) {
        if(password === user.password){
            const token = jwt.sign(user.email, secret);
            res.status(200).json({token});
        } else {
            res.status(401).json({ message: "Contraseña incorrecta" })
        }
    } else {
        res.status(404).json({ message: "Usuario no encontrado" })
    }
};

const insertUser = async (req, res) => {
    const insertedUser = await usersModels.insertUser(req.body);
    console.log(insertedUser)
    if(insertedUser) {
        const token = jwt.sign(insertedUser.email, secret);
        res.status(200).json({token});
    } else {
        res.status(400).json({message: "El usuario ya existe"});
    }
}

module.exports = {
    getUserByEmail,
    getUsers,
    insertUser,
};