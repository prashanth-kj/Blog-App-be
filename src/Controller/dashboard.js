import BlogModel from "../Models/blogs.js";
import { Status } from "../Common/utils.js";

const getAllBlogs= async(req,res)=>{
    try {
          
        let blogs =await BlogModel.find({status:Status.APPROVED},{_id:1,title:1,imageUrl:1,status:1,createdAt:1,description:1,likes:1}).sort({createdAt:1});

           res.status(200).send({
                message:"Blogs fetched sucessfully",
                blogs
           })
    
  } catch (error) {
       console.log(error);
       res.status(500).send({
       message:"Internal servar error",
       error:error.message
       })
  }   
}

export default {
       getAllBlogs
}
