const mariadb = require("mariadb");

const pool = mariadb.createPool({ // Adaptar a su configuración
    host: 'localhost',
    user: 'root',
    password: 'Facu_db',
    database: 'actividad20',
    port: '3306'
});

const getUsers = async () => {
    let conn;
    try{
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT * FROM users"
        );
        return rows;
    } catch(error) {
        console.log(error)
    } finally {
        if (conn) conn.release();
    }
    return false;
};

const insertUser = async (user) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const userExists = await conn.query(
            `SELECT * FROM users WHERE email=?`, [user.email]
        );
        if(userExists.length > 0) {
            console.log('El usuario ya existe');
            return false;
        }        
        const userCreate = await conn.query(
            `INSERT INTO users(name, lastname, email, password) VALUE(?,?,?,?)`,
            [user.name, user.lastname, user.email, user.password]
        );
        return { id: parseInt(userCreate.insertId), ...user }
    } catch(err) {
        console.log(err)
        return false;
    } finally {
        if (conn) conn.release();
    }
}

const getUserByEmail = async (email) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT email, password FROM users WHERE email=?", [email]
        );
        return rows[0];
    } catch(err) {
        console.log(err);
    } finally {
        if(conn) conn.release();
    }
    return false
};

module.exports = {
    getUserByEmail,
    getUsers,
    insertUser,
};