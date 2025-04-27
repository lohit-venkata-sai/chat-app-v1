import mongoose, { Schema } from "mongoose";

const userShema = new Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
    },
    fullName : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
    },
    profilePic: {
        type : String,
        default: '',
    }
},{timestamps: true});

const User = mongoose.model('user',userShema);
export default User