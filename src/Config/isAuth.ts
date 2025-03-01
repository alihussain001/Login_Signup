// import { Request, Response, NextFunction } from "express";
// import  jwt  from "jsonwebtoken";


// declare global{
//     namespace Express{
//         interface Request{
//             user?: any
//         }
//     }
// }

// export const verifyToken =  (req: Request, res: Response, next: NextFunction): void => {
//     try{
//         const authheader = req.headers.authorization;
//         if(!authheader || !authheader.startsWith("Bearer ")){
//             res.status(401).json({ error: "Unauthorized, No Token provided"});
//             return;
//         }

//         const token = authheader.split(" ")[1];

//         const decoded =  jwt.verify(token, process.env.SECRET_KEY || "defaltSecretkey");

//         req.user = decoded;

//         next(); 
//     }catch(error){
//         res.status(500).json({ message: "Error Validating Token" });
//         return;
//     }
// }