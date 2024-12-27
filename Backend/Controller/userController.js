import User from "../Model/userModel.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (_, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({ data: users, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // check if user already exist
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(401)
        .json({ success: false, message: "User already exist" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create user
    const createUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await createUser.save();
    return res.status(201).json({
      success: true,
      data: createUser,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    // validation
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    // check if user exist
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });
    }

    // check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, userExist.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
    return res
      .status(200)
      .json({ success: true, data: userExist, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
