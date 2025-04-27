import mongoose from "mongoose";

export const connectDB = async ()=>{
    try {
        const connection_string: string = process.env.MONGODB_URI as string;
        const conn: object = await mongoose.connect(connection_string);
        console.log('database connection successful');
    } catch (error:any) {
        console.error('mongodb connection error ',error.message);
    }
}