
import express from 'express'
// import connectDB from './config/db.js'
import authRoutes from './Routes/authRoute.js'
import categoryRoutes from './Routes/categoryRoute.js'
import productRoutes from './Routes/productRoutes.js'
import paymentRoutes from './Routes/paymentRoutes.js'
// connectDB();
// import cors from 'cors'
import mongoose from 'mongoose'
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'https://shoping-kzk7-deoq12urv-vishnulatas-projects.vercel.app',
  // origin:["https://shoping-kzk7-deoq12urv-vishnulatas-projects.vercel.app"],
  methods:["POST","GET"],
  credentials:true
}));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://shoping-kzk7-deoq12urv-vishnulatas-projects.vercel.app");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
mongoose.connect('mongodb+srv://vishnukaushik173:kklata123@cluster0.wzxhdvu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
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
