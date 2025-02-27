import { Router } from "express";
import { 
    signup

 } from "../Controllers/user.controller";




const router = Router();
router.post("/", signup);

export { router as userRouter};