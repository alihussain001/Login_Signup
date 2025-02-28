import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "";

async function connect(){
    try{
        await mongoose.connect(MONGO_URI);
    }catch (e){
        throw e;
    }
}

export { connect as mongoConnect };