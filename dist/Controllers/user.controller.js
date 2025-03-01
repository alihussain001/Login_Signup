"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.login = exports.signup = void 0;
const Users_model_1 = require("../Models/Users.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Plesae Input your username and password" });
            return;
        }
        const existingUser = yield Users_model_1.User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ message: "User Alreay Exist" });
            return;
        }
        // Hashing password:
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // saving on database
        const newUser = new Users_model_1.User({
            username,
            password: hashedPassword,
        });
        yield newUser.save();
        res.status(200).json({ message: "User created Successfully", newUser });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user" });
        return;
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(400).json({ message: "Please Input Username and Password" });
            return;
        }
        // CHECKING VALID USER
        const user = yield Users_model_1.User.findOne({ username });
        console.log("USer found in DB", user);
        if (!user) {
            res.status(401).json({ message: "Invalid Username or Password" });
            return;
        }
        // COMPARING VALID PASSWORDS:   
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: "Invalid Username or Password " });
            return;
        }
        // GENERATING JWT TOKEN 
        const token = jsonwebtoken_1.default.sign({ user_id: user._id, username: user.username }, process.env.SECRET_KEY || "", { expiresIn: "1h" });
        res.status(200).json({ message: "Login Successfully", data: user, token });
    }
    catch (error) {
        res.status(500).json({ message: "Error during Login" });
        return;
    }
});
exports.login = login;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Users_model_1.User.find({}, { password: 0 });
        res.status(200).json({ data: users });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error Fetching Users" });
        return;
    }
});
exports.getAllUsers = getAllUsers;
