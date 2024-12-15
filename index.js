const express = require("express");
const jsonServer = require("json-server");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router("Data.json");
const middlewares = jsonServer.defaults();

server.use(express.json()); // Agrega esto para procesar JSON
server.use(cors({ origin: "http://localhost:8100", credentials: true }));
server.use(jsonServer.bodyParser); // Asegura que req.body funcione correctamente

// Ruta para solicitud de recuperación de contraseña

const dataFilePath = path.join(__dirname, "Data.json");

server.post("/passwordResetRequest", async (req, res) => {
  const email = req.body?.email;

  if (!email) {
    return res.status(400).json({ error: "Correo electrónico requerido." });
  }

  const token = Math.random().toString(36).substr(2);
  const resetLink = `https://proyecto-mobil-entrega-3-1.onrender.com/reset-password?token=${token}`;

  // Datos para guardar
  const dataToSave = { email, token, createdAt: new Date().toISOString() };

  // Configurar correo
  const asunto = "Recuperación de Contraseña";
  const mensaje = `
    <h1>Recuperación de Contraseña</h1>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetLink}">Restablecer Contraseña</a>`;

  try {
    await enviarCorreo(email, asunto, mensaje);

    // Leer el archivo Data.json y agregar el nuevo registro
    const dataFilePath = path.join(__dirname, "Data.json");
    const currentData = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
    currentData.passwordRequests = currentData.passwordRequests || [];
    currentData.passwordRequests.push(dataToSave);
    fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2));

    return res.status(200).json({
      message: "Correo enviado con éxito y solicitud registrada.",
      token: token,
    });
  } catch (error) {
    console.error("Error al enviar correo o guardar datos:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
});

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
