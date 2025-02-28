import { Request, Response } from "express";
import { User } from "../Models/Users.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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
            password: hashedPassword,
        });
        await newUser.save();

        res.status(200).json({ message: "User created Successfully", newUser});
        return;

    }catch(error){
        res.status(500).json({message: "Error creating user"});
        return;
    }
};

export const login = async (req: Request, res: Response) =>{
    try{
        const { username, password} = req.body;

        if(!username || !password){
            res.status(400).json({ message: "Please Input Username and Password"});
            return;
        }
        
        const user = await User.findOne({username});
        console.log("USer found in DB", user);

        if(!user){
            res.status(401).json({ message: "Invalid Username or Password"});
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Entered Password", password);
        console.log("Stored Hashed Password", user.password);
        console.log("Password matched", passwordMatch);

        if(!passwordMatch){
            res.status(401).json({ message: "Invalid Username or Password "});
            return;
        }

        const token = jwt.sign(
            {user_id: user._id, username: user.username},
            process.env.SECRET_KEY || "",
            {expiresIn: "1h"}
        );

        res.status(200).json({ message: "Login Successfully", data: user, token})
    }catch(error){
        res.status(500).json({ message: "Error during Login"});
        return;
    }
};