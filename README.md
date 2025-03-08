# Sistema de Reservas de Hoteles 🏨

Este es un sistema de reservas para una cadena de hoteles en Colombia, desarrollado siguiendo la metodología RUP.

## Descripción del Proyecto

Este proyecto es un sistema de reservas de habitaciones para una cadena de hoteles en Colombia. Desarrollado con **Node.js**, **Express** y **PostgreSQL**, permite a los usuarios reservar, modificar y cancelar habitaciones, así como consultar su historial de reservas. El sistema incluye autenticación de usuarios y una interfaz moderna y responsive.

## 📌Características Principales

- **Autenticación de Usuarios:** Registro e inicio de sesión con JWT.
- **Gestión de Reservas:** Reservar, modificar y cancelar habitaciones.
- **Historial de Reservas:** Los usuarios pueden ver todas sus reservas anteriores.
- **Interfaz Moderna:** Diseño responsive y fácil de usar.
- **Seguridad:** Contraseñas almacenadas de forma segura usando variables de entorno.

## 🚀Tecnologías Utilizadas

- **Frontend:** HTML, CSS, JavaScript.
- **Backend:** Node.js, Express.
- **Base de Datos:** PostgreSQL.
- **Autenticación:** JSON Web Tokens (JWT).
- **Herramientas:** SonarQube (análisis de calidad), Docker (contenedorización).

## Requisitos del Sistema

- Node.js (v14 o superior)
- PostgreSQL (v12 o superior)
- npm (v6 o superior)

## 🔧Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/sdva-14/reservas-hoteles2.2.git
   cd reservas-hoteles2.2
Instala las dependencias:

bash
Copy
npm install
Configura la base de datos:

Crea una base de datos en PostgreSQL llamada reservas_hoteles.

Configura las credenciales en el archivo .env (ver .env.example).

Inicia el servidor:

bash
Copy
npm start
Abre tu navegador y visita http://localhost:3000.

Uso
Registro e Inicio de Sesión:

Regístrate como nuevo usuario o inicia sesión si ya tienes una cuenta.

Reservar una Habitación:

Selecciona el tipo de habitación, las fechas y los servicios adicionales.

Historial de Reservas:

Consulta todas tus reservas anteriores en la sección de historial.

Modificar o Cancelar Reservas:

Accede a tus reservas activas para modificarlas o cancelarlas.

📌 Contribución
¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork del repositorio.

Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).

Realiza tus cambios y haz commit (git commit -m 'Añadir nueva funcionalidad').

Haz push a la rama (git push origin feature/nueva-funcionalidad).

Abre un Pull Request.
