"use strict";

import { Error } from "../error/Error.js";
import { LoginService } from "../service/LoginService.js";

export const getJoin = (req, res) => res.render("users/join");
export const getLoign = (req, res) => res.render("users/login");

export const postLogin = async (req, res) => {
    const { id, pw } = req.body;
    try {
        const token = await LoginService.login(id, pw);
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ code: "OK", message: "로그인 성공" });
    } catch (e) {
        if (e.code) return res.status(e.status).json({ code: e.code, message: e.message });
        else return res.status(Error.INTERNAL_SERVER_ERROR.status).json(Error.INTERNAL_SERVER_ERROR);
    }
};

export const postJoin = async (req, res) => {
    const userJoinDto = req.body;
    try {
        await LoginService.join(userJoinDto);
        return res.status(200).json({ code: "OK", message: "회원가입 성공" });
    } catch (e) {
        if (e.code) return res.status(e.status).json({ code: e.code, message: e.message });
        else return res.status(Error.INTERNAL_SERVER_ERROR.status).json(Error.INTERNAL_SERVER_ERROR);
    }
};

export const postLogout = async (req, res) => {
    res.clearCookie('token')
    res.status(200).json({ code: "OK", message: "로그아웃 성공" })
};