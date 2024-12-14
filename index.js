const jsonServer = require("json-server");
const cors = require("cors");
const bodyParser = require("body-parser");
const enviarCorreo = require("./mailer");
const jsonFile = require("jsonfile");
const path = require("path");
require("dotenv").config();

const server = jsonServer.create();
const router = jsonServer.router("Data.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 10000;

// Ruta del archivo JSON
const filePath = path.join(__dirname, "Data.json");

// Configura CORS
server.use(
  cors({
    origin: [
      "https://proyecto-mobil-entrega-3-1.onrender.com", // Tu dominio en Render
      "http://localhost:8100", // Si usas Ionic serve localmente
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Manejo de solicitudes OPTIONS (preflight)
server.options("*", cors());

// Middleware para manejar JSON
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(middlewares);

// Función para guardar datos en el archivo JSON
const fs = require('fs');
async function guardarDatos(data) {
  try {
    // Crea el archivo si no existe
    if (!fs.existsSync(filePath)) {
      await jsonFile.writeFile(filePath, { passwordResetRequest: [] }, { spaces: 2 });
    }

    // Leer el archivo
    let existingData;
    try {
      existingData = await jsonFile.readFile(filePath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        existingData = { passwordResetRequest: [] };
      } else {
        throw err;
      }
    }

    if (!existingData.passwordResetRequest) {
      existingData.passwordResetRequest = [];
    }

    // Verificar duplicados
    const isDuplicate = existingData.passwordResetRequest.some(
      (entry) => entry.email === data.email && entry.isValid
    );

    if (isDuplicate) {
      console.warn("Ya existe una solicitud activa para este correo.");
      return; // Evita agregar duplicados.
    }

    // Agregar datos nuevos
    existingData.passwordResetRequest.push(data);

    // Escribir en el archivo
    await jsonFile.writeFile(filePath, existingData, { spaces: 2 });
    console.log("Datos actualizados correctamente en Data.json:", existingData);
  } catch (error) {
    console.error("Error al guardar datos:", error);
    throw error;
  }
}

// Ruta para solicitud de recuperación de contraseña
server.post("/passwordResetRequest", async (req, res) => {
  const email = req.body?.email;

  if (!email) {
    return res.status(400).json({ error: "Correo electrónico requerido." });
  }

  // Generar un token único
  const token = Math.random().toString(36).substr(2);
  const resetLink = `http://localhost:8100/reset-password?token=${token}`;

  // Configurar el correo
  const asunto = "Recuperación de Contraseña";
  const mensaje = `
    <h1>Recuperación de Contraseña</h1>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetLink}">Restablecer Contraseña</a>`
  ;

  const requestData = {
    email: email,
    token: token,
    isValid: true,
  };

  try {
    // Enviar el correo
    await enviarCorreo(email, asunto, mensaje);

    // Guardar los datos en el archivo JSON
    await guardarDatos(requestData);

    res.status(200).json({
      message: "Correo enviado con éxito y solicitud registrada.",
      token: token,
    });
  } catch (error) {
    if (error.message === "Ya existe una solicitud activa para este correo.") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error interno al procesar la solicitud." });
    }
  }
});

// Usar las rutas de JSON Server
server.use(router);

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});