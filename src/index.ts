import  Express from "express";
import { mongoConnect } from "./config/db";

const app = Express();
app.use(Express.json());

const PORT = 3000;

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