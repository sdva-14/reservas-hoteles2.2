
const express = require('express');
const cors = require('cors');
const { pool } = require('./database');
const authRoutes = require('./routes/auth');
const reservasRoutes = require('./routes/reservas');

// Configuración del servidor
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permitir solicitudes desde cualquier origen
app.use(express.json()); // Parsear JSON en las solicitudes

// Rutas
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api/reservas', reservasRoutes); // Rutas de reservas

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido al sistema de reservas de hoteles');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
