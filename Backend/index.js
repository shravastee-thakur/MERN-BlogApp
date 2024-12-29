import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./Db/userConnect.js";
import userRoute from "./Routes/userRoute.js";
import blogRoute from "./Routes/blogRoute.js";

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
app.use(express.json());

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);

// api
// http://localhost:3000/api/v1/user
// http://localhost:3000/api/v1/blog

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
