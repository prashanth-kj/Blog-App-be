import express from 'express';
import DashboardController from '../Controller/dashboard.js'
import Auth from '../Common/auth.js';


 const router = express.Router();
             
     router.get('/',Auth.validate, DashboardController.getAllBlogs)
  
 export default router   