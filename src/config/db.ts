import mongoose from "mongoose";

const uri = "mongodb+srv://TrainersTome:alihussain9981@oriondb.1lnjo.mongodb.net/lotgin_singup?retryWrites=true&w=majority&appName=OrionDB";

async function connect(){
    try{
        await mongoose.connect(uri);
    }catch (e){
        throw e;
    }
}

export { connect as mongoConnect };