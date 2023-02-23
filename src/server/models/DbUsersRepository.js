import db from "../config/db";

export class DbUsersRepository {
    async findById(id) {
        const QUERY = `SELECT no, id, pw, name FROM users WHERE id=?`;
        return db.execute(QUERY, [id]).then((result) => result[0][0]);
    }
    
    async save({id, pw, name}) {
        const QUERY = `INSERT INTO users (id, pw, name) VALUES (?,?,?)`;
        return db.execute(QUERY, [id, pw, name])
    }
}