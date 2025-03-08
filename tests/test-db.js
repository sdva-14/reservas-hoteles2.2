const pool = require('../src/config/database');

(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Conexión exitosa:', res.rows[0]);
    } catch (error) {
        console.error('Error de conexión:', error);
    }
})();