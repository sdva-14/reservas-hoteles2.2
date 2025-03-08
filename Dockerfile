# Usar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "src/server.js"]