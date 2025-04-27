import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const generateJwtToken = async ({userId}:any,res:Response)=>{
    const token = jwt.sign({userId},process.env.JWT_TOKEN_SECRET,{
        expiresIn : '7d',
    })
    cookies.set('userId',token,{
        maxAge : 7*24*60*60,
        httpOnly : true,
        secure : true,
    })
    return token
}