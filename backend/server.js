import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cookieParser from 'cookie-parser';
import path from 'path'
import { errorHandler, mongooseErrorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/products', productRoutes);
app.use("/api/orders", orderRoutes)
app.use("/api/users", userRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/api/config/paypal", (req, res)=>res.send({
    clientId: process.env.PAYPAL_CLIENT_ID
  })
)
const __dirname = path.resolve() 
app.use("/uploads", express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,"/frontend/build")))

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}else{
  app.get('/', (req, res) => {
  res.send('API is running...');
});
}

app.use(notFound);
app.use(errorHandler)
app.use(mongooseErrorHandler);  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
