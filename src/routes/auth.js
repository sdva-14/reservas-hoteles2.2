const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../database');

const router = express.Router();

// Registro de usuario
router.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (usuarioExistente.rows.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar nuevo usuario en la base de datos
        const nuevoUsuario = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',
            [nombre, email, hashedPassword]
        );

        // Generar token JWT
        const token = jwt.sign(
            { id: nuevoUsuario.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );

        if (usuario.rows.length === 0) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const contraseñaValida = await bcrypt.compare(
            password,
            usuario.rows[0].password
        );

        if (!contraseñaValida) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
