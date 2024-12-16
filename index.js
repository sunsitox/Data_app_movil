const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const enviarCorreo = require("./mailer"); // Asegúrate de que este archivo sea correcto
const port = process.env.PORT || 10000;

// Crear servidor y middlewares
const server = express();
const router = jsonServer.router("Data.json");
const middlewares = jsonServer.defaults();
const dataFilePath = path.join(__dirname, "Data.json");

// Middleware para parsear el cuerpo de las solicitudes
server.use(express.json());
server.use(cors({
  origin: "*", // Cambiar a origen específico en producción
  credentials: true,
}));

// Validar existencia de Data.json y crearlo si no existe
if (!fs.existsSync(dataFilePath)) {
  console.error("Archivo Data.json no encontrado. Creando uno nuevo...");
  fs.writeFileSync(dataFilePath, JSON.stringify({ passwordRequests: [], usuarios: [] }, null, 2));
}

// Ruta para actualizar solo la contraseña basado en el correo
server.put('/usuarios', (req, res) => {
  console.log('PUT /usuarios recibido:', req.body); // Depuración
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Faltan datos necesarios.' });
  }

  // Leer el archivo de datos y comprobar su formato
  let usuarios;
  try {
    console.log('Leyendo archivo Data.json...');
    usuarios = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    console.log('Archivo leído correctamente.');

    // Comprobamos si los datos leídos son un array
    if (!Array.isArray(usuarios)) {
      throw new Error('El archivo Data.json no contiene un arreglo de usuarios.');
    }
  } catch (error) {
    console.error('Error al leer o formatear el archivo:', error);
    return res.status(500).json({ error: 'Error al leer o formatear el archivo de usuarios.' });
  }

  // Buscar el índice del usuario en el array
  const userIndex = usuarios.findIndex(user => user.email === email);
  if (userIndex === -1) {
    console.error('Usuario no encontrado:', email);
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  // Actualizar la contraseña
  console.log('Actualizando la contraseña para el usuario:', email);
  usuarios[userIndex].password = password;

  // Guardar el archivo Data.json con los cambios
  try {
    console.log('Guardando el archivo Data.json...');
    fs.writeFileSync(dataFilePath, JSON.stringify(usuarios, null, 2));
    console.log('Archivo guardado correctamente.');
  } catch (error) {
    console.error('Error al guardar el archivo:', error);
    return res.status(500).json({ error: 'Error al guardar los datos en el archivo.' });
  }

  return res.status(200).json({ message: 'Contraseña actualizada con éxito.' });
});

// Ruta para recuperación de contraseña
server.post("/passwordResetRequest", async (req, res) => {
  console.log("Datos recibidos del cliente:", req.body); // Log para debug
  const email = req.body?.email;

  if (!email) {
    return res.status(400).json({ error: "Correo electrónico requerido." });
  }

  const token = Math.random().toString(36).substr(2);
  const isValid = true; // Indicador para comprobar si el token es válido
  const resetLink = `http://localhost:8100/reset-password?email=${encodeURIComponent(email)}&token=${token}&isValid=${isValid}`;

  const dataToSave = { email, token, isValid, createdAt: new Date().toISOString() };
  const asunto = "Recuperación de Contraseña";
  const mensaje = `<h1>Recuperación de Contraseña</h1><p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetLink}">Restablecer Contraseña</a>`;

  try {
    await enviarCorreo(email, asunto, mensaje);
    console.log(`[${new Date().toISOString()}] - Correo enviado con éxito a ${email}`);

    const currentData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    currentData.passwordRequests = currentData.passwordRequests || [];
    currentData.passwordRequests.push(dataToSave);
    fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2));

    return res.status(200).json({
      message: "Correo enviado con éxito y solicitud registrada.",
      resetLink: resetLink, // Incluimos el link en la respuesta para facilitar pruebas
    });
  } catch (error) {
    console.error("Error al enviar correo o guardar datos:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

// Middlewares predeterminados de JSON Server y rutas adicionales
server.use(middlewares);
server.use(router);

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
