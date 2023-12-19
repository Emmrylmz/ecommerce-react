import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://banleue13:EmV9ymdlFExTYae6@cluster0.lvzd0dt.mongodb.net/?retryWrites=true&w=majority").then(() => {
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