const express = require("express");
const { login, getUser, logout } = require("../controllers/auth_controller");
const authMiddleware = require("../middleware/check_token");

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/get-user", authMiddleware, getUser);
authRouter.get("/logout", logout);

module.exports = authRouter;
