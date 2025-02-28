import { Router } from "express";
import { 
    login,
    signup

 } from "../Controllers/user.controller";




const router = Router();
router.post("/signup", signup);
router.post("/login", login);

export { router as userRouter};