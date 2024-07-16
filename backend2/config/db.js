import mongoose from "mongoose";
// import colors from "colors";
const MONGO_URL = "mongodb+srv://vishnukaushik173:kklata123@cluster0.wzxhdvu.mongodb.net/orderquick?retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    console.log(
      `Connected To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`);
  }
};

export default connectDB;