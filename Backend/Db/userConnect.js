import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://devshravastee:Vx6cARdVKOGnN93Z@blogapp.8o4pb.mongodb.net/blogapp?retryWrites=true&w=majority&appName=BlogApp"
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
