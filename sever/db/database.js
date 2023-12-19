import mongoose from "mongoose";
import {} from 'dotenv/config'


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_KEY).then(() => {
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