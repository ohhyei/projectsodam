import { DbUsersRepository } from "../models/DbUsersRepository";
import jwt from 'jsonwebtoken';

const userRepository = new DbUsersRepository();

export const loginCheck = (req, res, next) => {
    const { token } = req.cookies;
    if(!token) return res.redirect("/users/login");
    const jwtSecretKey = process.env.SECRET_KEY;
    jwt.verify(
        token,
        jwtSecretKey,
        async (error, decoded) => {
            if (error) {
                console.log(error)
                return res.clearCookie('token').redirect("/users/login"); 
            }
            const user = await userRepository.findById(decoded.id);
            if (!user) return res.clearCookie('token').redirect("/users/login");
            req.user = user;
            next();
        }
    );
}

export const logoutCheck = (req, res, next) => {
    const { token } = req.cookies
    if(token) return res.redirect("/");
    next();
}