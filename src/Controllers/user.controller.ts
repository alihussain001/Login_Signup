import { Request, Response } from "express";
import { User } from "../Models/Users.model";
import bcrypt from 'bcrypt';
export const signup = async (req: Request, res: Response) =>{
    try{
        const{ username, password} = req.body;

        if(!username || !password){
            res.status(400).json({ message: "Plesae Input your username and password"});
            return;
        }

        const existingUser = await User.findOne({ username});
        if(existingUser){
            res.status(400).json({ message: "User Alreay Exist"});
            return;
        }

        // Hashing password:
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // saving on database
        const newUser = new User({
            username, 
            password,
        });
        await newUser.save();

        res.status(200).json({ message: "User created Successfully", newUser});
        return;

    }catch(error){
        res.status(500).json({message: "Error creating user"});
        return;
    }
};