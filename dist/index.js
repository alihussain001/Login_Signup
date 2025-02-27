"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./Config/db");
const user_routes_1 = require("./Routes/user.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = 3000;
app.use("/", user_routes_1.userRouter);
app.get("/", (req, res) => {
    res.json({
        version: "1.0",
    });
});
(0, db_1.mongoConnect)().then(() => {
    app.listen(3000, () => {
        console.log("Server started at port 3000");
    });
});
