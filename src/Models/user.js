import mongoose from './index.js';

const validateEmail = (e)=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(e); 
}

const userSchema= new mongoose.Schema({

      firstName:{
            type:String,
            required:[true,'firstname is required']
      },
      lastName:{
            type:String,
            required:[true, 'lastname  is required']
      },
      email:{
            type:String,
            required:[true, 'email is required'],
            validate:validateEmail
      },
      password:{
            type:String,
            required:[true,'password is required']
      },
      status:{
             type:Boolean,
             default:true
      },
      role:{
            type:String,
            default:"user"
      },
      createdAt:{
            type:Date,
            default:Date.now()
            
      }
    },{
        collection:'users',
        versionKey: false
    })

    const UserModel = mongoose.model('users', userSchema);

     export default UserModel;
