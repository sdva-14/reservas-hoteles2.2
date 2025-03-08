const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('./database');

const generarToken = (usuario) => {
    return jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const registrarUsuario = async (nombre, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
        [nombre, email, hashedPassword]
    );
    return result.rows[0];
};

const iniciarSesion = async (email, password) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const usuario = result.rows[0];
    if (usuario && await bcrypt.compare(password, usuario.password)) {
        return generarToken(usuario);
    }
    throw new Error('Credenciales inválidas');
};

module.exports = { registrarUsuario, iniciarSesion };