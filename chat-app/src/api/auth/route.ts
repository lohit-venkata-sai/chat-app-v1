import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from '@/models/users.model'

export const signup = async (req:Request,res:Response)=>{
    try {
        const body:any = await req.json();
        const {fullName,email,password} = body;

        if(!fullName || !email || !password){
            return NextResponse.json({message: 'All fields are required'},{status:400});
        }
        if(password.trim().length< 6){
            return NextResponse.json({message: 'Password min length should be 6'},{status: 400});
        }
        
        const checkUser = await User.findOne({email});
        if(checkUser){
            return NextResponse.json({message:'user already exists with this email'},{status:400});
        }
        //hashpassword
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const user = new User({fullName,email,password : hashedPassword});
        await user.save();



    } catch (error:any) {
        console.error('error at signup',error.message);
        return NextResponse.json({message : 'internal server issue'},{status:500});
    }
}
export const login = async (req:Request,res:Response)=>{
    try {
        const body = await req.json();
        const {email,password} = body;
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({message:'user doest exists'},{status: 400}); 
        }
        //check password
        const isValid = bcryptjs.compare(password,user.password);
        if(!isValid){
            return NextResponse.json({message:'invalid password'},{status:400});
        }
        //create jwt token in user cookie
        
    } catch (error:any) {
        console.error('error at login route',error.message);
        return NextResponse.json({message:'internal server error'},{status:500});
    }
}