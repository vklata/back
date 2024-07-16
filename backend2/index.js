
import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './Routes/authRoute.js'
import categoryRoutes from './Routes/categoryRoute.js'
import productRoutes from './Routes/productRoutes.js'
import paymentRoutes from './Routes/paymentRoutes.js'
connectDB();
import cors from 'cors'
import mongoose from 'mongoose'
const app = express();
// app.use(cors());
app.use(express.json());
app.use(cors({
  // origin: 'http://localhost:5173'
  origin:["https://shoping-kzk7.vercel.app"],
  methods:["POST","GET"],
  credentials:true
}));
mongoose.connect('mongodb+srv://vishnukaushik173:kklata123@cluster0.wzxhdvu.mongodb.net/orderquick?retryWrites=true&w=majority&appName=Cluster0');
app.use('/api',authRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)



app.use('/api',paymentRoutes)

app.get('*',(req,res,next)=>{
  res.status(200).json({
    message:'bad request'
  })
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
