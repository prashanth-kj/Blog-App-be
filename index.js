import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import AppRoutes from './src/Routes/index.js'

  dotenv.config();

  const PORT=process.env.PORT;
  const app= express();

   app.use(cors());
   app.use(express.json());
   app.use('/', AppRoutes)
    
   app.listen(PORT,()=>console.log(`app is listening ${PORT}`));