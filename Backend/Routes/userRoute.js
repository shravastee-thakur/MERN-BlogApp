import express from "express";
import {
  getAllUsers,
  loginController,
  registerController,
} from "../Controller/userController.js";

const route = express.Router();

// get all users
route.get("/all-users", getAllUsers);

// create user
route.post("/register", registerController);

// login user
route.post("/login", loginController);

export default route;
