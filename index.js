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
server.use(cors({ origin: "http://localhost:8100", credentials: true }));

// Validar existencia de Data.json y crearlo si no existe
if (!fs.existsSync(dataFilePath)) {
  console.error("Archivo Data.json no encontrado. Creando uno nuevo...");
  fs.writeFileSync(dataFilePath, JSON.stringify({ passwordRequests: [] }, null, 2));
}

// Ruta para recuperación de contraseña
server.post("/passwordResetRequest", async (req, res) => {
  console.log("Datos recibidos del cliente:", req.body); // Log para debug
  const email = req.body?.email;

  // Validación del correo electrónico
  if (!email) {
    console.error("Error: Falta el correo en el body.");
    return res.status(400).json({ error: "Correo electrónico requerido." });
  }

  const token = Math.random().toString(36).substr(2);
  const isValid = true; // Indicador para comprobar si el token es válido
  const resetLink = `http://localhost:8100/reset-password?email=${encodeURIComponent(email)}&token=${token}&isValid=${isValid}`;

  // Datos a guardar en Data.json
  const dataToSave = { email, token, isValid, createdAt: new Date().toISOString() };

  // Configurar correo
  const asunto = "Recuperación de Contraseña";
  const mensaje = `
    <h1>Recuperación de Contraseña</h1>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetLink}">Restablecer Contraseña</a>`;

  try {
    // Enviar correo
    console.log("Intentando enviar correo a:", email);
    await enviarCorreo(email, asunto, mensaje);
    console.log(`[${new Date().toISOString()}] - Correo enviado con éxito a ${email}`);

    // Leer y actualizar Data.json
    let currentData;
    try {
      currentData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    } catch (error) {
      console.error("Error al leer Data.json:", error);
      return res.status(500).json({ error: "Error al leer archivo de datos." });
    }

    currentData.passwordRequests = currentData.passwordRequests || [];
    currentData.passwordRequests.push(dataToSave);

    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2));
      console.log(`[${new Date().toISOString()}] - Datos guardados en Data.json`);
    } catch (error) {
      console.error("Error al escribir en Data.json:", error);
      return res.status(500).json({ error: "Error al guardar datos." });
    }

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
