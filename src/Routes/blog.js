import express from 'express';
import Auth from '../Common/auth.js'
import blogController from '../Controller/blog.js'


const router= express.Router();

  router.post('/create', Auth.validate, blogController.createBlog);
  router.put('/edit/:id', Auth.validate,blogController.editBlog);
  router.get('/user', Auth.validate,blogController.getBlogByUserId);
  router.put('/status/:id/:status',Auth.validate,Auth.adminGuard, blogController.updateBlogStatus);
  router.get('/:id' ,Auth.validate,blogController.getBlogById);
  router.put('/:id/:like',Auth.validate,blogController.handleLikes);
  router.get('/', Auth.validate,Auth.adminGuard, blogController.getAllBlogs)


  export default router