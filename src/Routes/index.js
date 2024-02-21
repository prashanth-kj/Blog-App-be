import  express from 'express';
import userRoutes from './user.js'
import blogRoutes from './blog.js'
import dashboardRoutes from './dashboard.js';


 const router = express.Router();

  router.use('/user', userRoutes); 
  router.use('/blog',blogRoutes);
  router.use('/dashboard',dashboardRoutes);
  
  

 export default router