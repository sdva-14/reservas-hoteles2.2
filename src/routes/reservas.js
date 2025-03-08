const express = require('express');
const { pool } = require('../database');
const router = express.Router();

router.get('/historial/:usuario_id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM reservas WHERE usuario_id = $1 ORDER BY fecha_entrada DESC',
            [req.params.usuario_id]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;