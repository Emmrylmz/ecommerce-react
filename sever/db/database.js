import mongoose from "mongoose";
<<<<<<< HEAD
import {} from 'dotenv/config'


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_KEY).then(() => {
=======
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://banleue13:EmV9ymdlFExTYae6@cluster0.lvzd0dt.mongodb.net/?retryWrites=true&w=majority").then(() => {
>>>>>>> bbeb05e9ee6f5890eb29058bd2feb7c18e67accf
        console.log("something?")
      }), {
      useNewUrlParser: true,
      useUnifiedTopology:true,
      };
    console.log('Connected to database!');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
  }
};

export default connectDB