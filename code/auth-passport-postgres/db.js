async function connect() {
    if (global.connection) {
        return global.connection.connect();
    }
    const { Pool } = require("pg");
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
    });

    const client = await pool.connect();

    // Testando a conexão
    const res = await client.query("SELECT NOW()");
    console.log(res);
    client.release();

    // Guardando para usar sempre a mesma pool
    global.connection = pool;

    return pool.connect();
}

async function findUser(username) {
    const conn = await connect();
    const res = await conn.query(
        `SELECT * FROM users WHERE username=$1 LIMIT 1`,
        [username]
    );

    if (res.rows.length > 0) return res.rows[0];
    else return null;
}

async function findUserbyId(id) {
    const conn = await connect();
    const res = await conn.query("SELECT * FROM users WHERE id=$1 limit 1", [
        id,
    ]);
    if (res.rows.length > 0) return res.rows[0];
    else return null;
}
module.exports = { connect, findUser, findUserbyId };
