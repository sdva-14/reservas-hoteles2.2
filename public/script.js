document.addEventListener('DOMContentLoaded', () => {
    const seccionAuth = document.getElementById('seccionAuth');
    const seccionReserva = document.getElementById('seccionReserva');
    const seccionHistorial = document.getElementById('seccionHistorial');
    const btnLogin = document.getElementById('btnLogin');
    const btnRegistro = document.getElementById('btnRegistro');
    const btnReservas = document.getElementById('btnReservas');
    const btnLogout = document.getElementById('btnLogout');
    const formAuth = document.getElementById('formAuth');
    const authToggle = document.getElementById('authToggle');
    const toggleAuth = document.getElementById('toggleAuth');
    const authTitle = document.getElementById('authTitle');
    const btnAuth = document.getElementById('btnAuth');
    const formReserva = document.getElementById('formReserva');
    const tablaReservas = document.getElementById('tablaReservas').querySelector('tbody');

    let isLogin = true; // Cambia entre inicio de sesión y registro

    // Alternar entre inicio de sesión y registro
    toggleAuth.addEventListener('click', (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        authTitle.textContent = isLogin ? 'Iniciar Sesión' : 'Registrarse';
        btnAuth.textContent = isLogin ? 'Iniciar Sesión' : 'Registrarse';
        authToggle.innerHTML = isLogin
            ? '¿No tienes una cuenta? <a href="#" id="toggleAuth">Regístrate aquí</a>.'
            : '¿Ya tienes una cuenta? <a href="#" id="toggleAuth">Inicia sesión aquí</a>.';
    });

    // Manejar el formulario de autenticación
    formAuth.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const url = isLogin ? '/api/auth/login' : '/api/auth/registro';
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            mostrarInterfazUsuario();
        } else {
            alert('Error en la autenticación');
        }
    });

    // Mostrar la interfaz de usuario después de la autenticación
    function mostrarInterfazUsuario() {
        seccionAuth.classList.add('hidden');
        seccionReserva.classList.remove('hidden');
        seccionHistorial.classList.remove('hidden');
        btnLogin.classList.add('hidden');
        btnRegistro.classList.add('hidden');
        btnReservas.classList.remove('hidden');
        btnLogout.classList.remove('hidden');
        cargarHistorialReservas();
    }

    // Cargar el historial de reservas
    async function cargarHistorialReservas() {
        const response = await fetch('/api/reservas/historial', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const reservas = await response.json();
        tablaReservas.innerHTML = reservas.map(reserva => `
            <tr>
                <td>${reserva.tipo_habitacion}</td>
                <td>${reserva.fecha_entrada}</td>
                <td>${reserva.fecha_salida}</td>
                <td>${reserva.servicios_adicionales.join(', ')}</td>
                <td>${reserva.estado}</td>
            </tr>
        `).join('');
    }

    // Manejar el formulario de reserva
    formReserva.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tipoHabitacion = document.getElementById('tipoHabitacion').value;
        const fechaEntrada = document.getElementById('fechaEntrada').value;
        const fechaSalida = document.getElementById('fechaSalida').value;
        const servicios = [];
        if (document.getElementById('desayuno').checked) servicios.push('Desayuno');
        if (document.getElementById('spa').checked) servicios.push('Spa');
        if (document.getElementById('transporte').checked) servicios.push('Transporte');

        const response = await fetch('/api/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ tipoHabitacion, fechaEntrada, fechaSalida, servicios }),
        });

        if (response.ok) {
            alert('Reserva realizada con éxito');
            cargarHistorialReservas();
        } else {
            alert('Error al realizar la reserva');
        }
    });

    // Cerrar sesión
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.reload();
    });
});