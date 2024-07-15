// import mongoose from "mongoose";

const MONGO_URL = "mongodb+srv://vishnukaushik173:kklata123@cluster0.wzxhdvu.mongodb.net/orderquick?retryWrites=true&w=majority&appName=Cluster0";

// const mongoose = require('mongoose');
// const User = require("./models/User");


// mongoose.connect(MONGO_URL, {
//   serverSelectionTimeoutMS: 30000,
//   socketTimeoutMS: 45000, 
// });

// const db=mongoose.connection;
// db.on('connected', async(err,result) =>{
//   if(err) console.log("errrr",err)
//     else{
//   console.log('Mongoose connected to db');

  // async function fetchUsers() {
  //   try {
  //     // Wait for the connection to be established
  //     await mongoose.connection;
  
  //     // Fetch all users from the collection
  //     const users = await User.find({});
  //     console.log("Fetched users:", users);
  //   } catch (err) {
  //     console.error("Failed to fetch users:", err);
  //   } finally {
  //     // Close the connection after fetching the data
  //     mongoose.connection.close();
  //   }
  // }
  
  // Call the function to fetch and log the data
  // fetchUsers().catch(console.dir);
  
// }
// })
  // const fetch_data =await mongoose.connection.db.collections("users");
  // fetch_data.find({}).toArray(function (err, data) {
  //   if(err) console.log("error",err);
  //   else console.log(data)})})



// db.on('error', (err) => {
//   console.log('Mongoose connection error: ' + err);
// });

// db.on('disconnected', () => {
//   console.log('Mongoose disconnected');
// });
// export default db;

// mongoose.set('bufferCommands', false);



import mongoose from "mongoose";
// import colors from "colors";
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