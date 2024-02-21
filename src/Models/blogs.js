import mongoose  from './index.js';

 const blogSchema = new  mongoose.Schema({
       
        title:{
              type:String,
              required:[true,'title is required'],
        },
        imageUrl:{
              type:String,
              required:[true,'imageUrl is required']
        },
        description:{
               type:String,
               required:[true, 'description is required']
        },
        status:{
              type:String,
              default:"pending"
        },
        createdBy:{
              type:String,
              required:[true,'createdby is required']
        },
        approvedBy:{type:String},
        modifiedAt:{type:Date},
        rejectedBy:{ type:String}, 
        reason:{
            type:String,
            default:""
        },
        likes:{
            type:Number,
            default: 0
      },
        createdAt:{
            type:Date,
            default:Date.now()
        }

 },{
    collection:'blogs',
    versionKey:false
 })

  const BlogModel= mongoose.model('blogs',blogSchema);

   export default BlogModel