import  Express from "express";
import { mongoConnect } from "./Config/db";
import { userRouter } from "./Routes/user.routes";

const app = Express();
app.use(Express.json());

const PORT = 3000;

app.use("/", userRouter);


app.get("/", (req, res) => {
    res.json({
        version: "1.0",
    });
});

mongoConnect().then(() => {
    app.listen(3000, () => {
        console.log("Server started at port 3000");
    });
});

