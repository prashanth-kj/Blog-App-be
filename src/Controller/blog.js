import BlogModel from '../Models/blogs.js';
import {Status} from '../Common/utils.js';

const createBlog=async(req,res)=>{
    try {
        
         let {title,imageUrl,description}= req.body
            
            if(title && imageUrl && description){
                 
                   await BlogModel.create({
                        title,
                        imageUrl,
                        description,
                        createdBy:req.headers.userId
                   })
             
                 res.status(201).send({
                      message:"blog created sucessfully"
                 })

            }else{
                 res.status(400).send({
                      message:"All data field is required"
                 })
            }
    } catch (error) {
          console.log(error);
          res.status(500).send({
            message:"Internal servar error",
            error:error.message
         })
    }
}

const editBlog=async(req,res)=>{
   try {
         let blogId= req.params.id;

           if(blogId){
                 let blog = await BlogModel.findOne({_id:blogId}) 
                      
                      if(blog){
                        let {title,imageUrl,description}=req.body;
                              
                            blog.title=title;
                            blog.imageUrl=imageUrl;
                            blog.description=description;
                            blog.status=Status.PENDING;
                            blog.modifiedAt= Date.now();

                            await blog.save();

                             res.status(200).send({
                                 message:"Blog edited sucessfully"
                             })

                      }else{
                           res.status(400).send({
                                message:"blog is not found"
                           })
                      }
                     
                   
           }else{
               res.status(400).send({
                    message:"blog Id is Not found"
               })
           }
         
   } catch (error) {
            console.log(error);
            res.status(500).send({
            message:"Internal servar error",
            error:error.message
        })
   }
}

const getBlogByUserId=async(req,res)=>{
    try {
         
    let blogs = await BlogModel.find({createdBy:req.headers.userId},{_id:1,title:1,imageUrl:1,status:1,createdAt:1,reason:1}).sort({createdAt:1})
        
         res.status(200).send({
             message:"blogs fetched sucessfully",
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

const getAllBlogs= async(req,res)=>{
   try {
          
         let blogs =await BlogModel.find({},{_id:1,title:1,imageUrl:1,status:1,createdAt:1,reason:1}).sort({createdAt:1});

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

const getBlogById=async(req,res)=>{
       try {
             
           let blogId= req.params.id;

            if(blogId){
                   let blog = await BlogModel.findById(blogId);
                       
                      res.status(200).send({
                           message: "Blog data fetched sucessfully",
                           blog
                      })
                      
                  
            }else{
                  res.status(400).send({
                     message:"Blog Id is  not found"
                  })
            }

       } catch (error) {
            console.log(error);
            res.status(500).send({
            message:"Internal servar error",
            error:error.message
            })
       }
}

const updateBlogStatus= async(req,res)=>{
       try {
           let blogId = req.params.id;
           let status= req.params.status;
           
            if(blogId && status){
                 let {reason} = req.body;

                  let blog = await BlogModel.findById(blogId);

                    if(status === Status.APPROVED){
                         
                         blog.status= Status.APPROVED;
                         blog.approvedBy= req.headers.userId;
                         blog.reason="";
                         
                    }
                    else if(status === Status.REJECTED){
                           blog.status= Status.REJECTED;
                           blog.rejectedBy=req.headers.userId;
                           blog.reason= reason;
                         
                    }
                    else{
                            blog.status=Status.PENDING
                    }

                    blog.modifiedAt= Date.now();

                     await blog.save();

                      res.status(200).send({
                          message:" Blog status updated sucessfully"
                      })


            }else{
                 res.status(400).send({
                      message:"blogId not Found"
                 })
            }
       } catch (error) {
            console.log(error);
            res.status(500).send({
            message:"Internal servar error",
            error:error.message
            })
       }
}

const handleLikes = async (req, res) => {
     try {
         let blogId = req.params.id;
         let likedValue = req.params.like;
         
         let blog = await BlogModel.findById(blogId);
 
         if (!blog) {
             return res.status(400).send({
                 message: "Blog not found"
             });
         }
 
         // Increment or decrement likes based on likedValue
         if (likedValue === 'true' ) {
             blog.likes = blog.likes + 1;
            
         } else if (likedValue === 'false') {
             blog.likes = blog.likes - 1;
            
         } else {
             return res.status(400).send({
                 message: "Invalid value for like parameter"
             });
         }

         await blog.save();
 
         res.status(200).send({
             message: "Likes updated",
             likes: blog.likes
         });
     } catch (error) {
         console.log(error);
         res.status(500).send({
             message: "Internal server error"
         });
     }
 }


 

 
export default {
       createBlog,
       editBlog,
       getAllBlogs,
       getBlogById,
       getBlogByUserId,
       updateBlogStatus,
       handleLikes
}