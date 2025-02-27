"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../Controllers/user.controller");
const router = (0, express_1.Router)();
exports.userRouter = router;
router.post("/", user_controller_1.signup);
