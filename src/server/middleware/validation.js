import { Error } from "../error/Error";

export const loginForm = (req, res, next) => {
    const { id, pw } = req.body;
    if(!id) return res.status(Error.ID_EMPTY.status).json(Error.ID_EMPTY);
    else if(!pw) return res.status(Error.PW_EMPTY.status).json(Error.PW_EMPTY);
    next();
}

export const joinForm = (req, res, next) => {
    const { id, pw, name } = req.body;
    if(!id) return res.status(Error.ID_EMPTY.status).json(Error.ID_EMPTY);
    else if(!pw) return res.status(Error.PW_EMPTY.status).json(Error.PW_EMPTY);
    else if(!name) return res.status(Error.NAME_EMPTY.status).json(Error.NAME_EMPTY);
    next();
}