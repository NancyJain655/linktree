const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default:null,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    category:{
      type:String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String, 
      default: "",
    },
    backColor:{
      type:String,
      enum:["#342B26","#FFFFFF","#000000"],
      default:"#000000",
  },
  Bio:{
    type:String,
    default:"Bio",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);