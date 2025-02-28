import  Express from "express";
import { mongoConnect } from "./Config/db";
import { userRouter } from "./Routes/user.routes";
import dotenv from 'dotenv';


dotenv.config();

const app = Express();
const PORT = process.env.PORT || 3000;

app.use(Express.json());

mongoConnect().then(() => {
    app.listen(3000, () => {
        console.log("Server started at port 3000");
    });
});

app.use("/", userRouter);


app.get("/", (req, res) => {
    res.json({
        version: "1.0",
    });
});



