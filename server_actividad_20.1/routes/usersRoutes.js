const express = require("express");
const userRouter = express.Router();

const userControllers = require("../controllers/usersControllers");

userRouter.post("/:email", userControllers.getUserByEmail);
userRouter.get("/", userControllers.getUsers);
userRouter.post("/", userControllers.insertUser);



module.exports = userRouter;