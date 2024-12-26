import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./Db/userConnect.js";

//PORT
const PORT = process.env.PORT || 5000;

// database connection
connectDB();

// configure env
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
