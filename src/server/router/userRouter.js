"use strict";

import express from "express";

import { getJoin, getLoign, postJoin, postLogin, postLogout } from "../controller/loginController.js";
import { logoutCheck } from "../middleware/loginCheck.js";
import { joinForm, loginForm } from "../middleware/validation.js";

const userRouter = express.Router();

userRouter.route("/join").get(getJoin).post(joinForm, postJoin);
userRouter.route("/login").get(logoutCheck, getLoign).post(loginForm, postLogin);
userRouter.route("/logout").post(postLogout);

export default userRouter;