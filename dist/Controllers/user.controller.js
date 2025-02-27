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
exports.signup = void 0;
const Users_model_1 = require("../Models/Users.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
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
            password,
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
