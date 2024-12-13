const jsonServer = require("json-server");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonFile = require("jsonfile");
const path = require("path");
const enviarCorreo = require("./mailer");
require("dotenv").config();

const server = jsonServer.create();
const router = jsonServer.router("Data.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 10000;

// Ruta del archivo JSON
const filePath = path.join(__dirname, "Data.json");

// Configura CORS
server.use(cors());
server.options("*", cors());
server.use(bodyParser.json());

// Función para guardar datos en JSON
async function guardarDatos(data) {
  try {
    const existingData = await jsonFile.readFile(filePath);
    console.log("Data leída desde JSON antes de guardar:", existingData); // LOG

    if (!existingData.passwordResetRequests) {
      existingData.passwordResetRequests = [];
    }

    const isDuplicate = existingData.passwordResetRequests.some(
      (entry) => entry.email === data.email && entry.isValid
    );

    if (isDuplicate) {
      throw new Error("Ya existe una solicitud activa para este correo.");
    }

    existingData.passwordResetRequests.push(data);

    await jsonFile.writeFile(filePath, existingData, { spaces: 2 });
    console.log("Datos escritos exitosamente en JSON:", existingData); // LOG
  } catch (error) {
    console.error("Error al guardar datos:", error.stack); // LOG
    throw error;
  }
}

// Ruta para manejo de tokens
server.post("/passwordResetRequest", async (req, res) => {
  const email = req.body?.email;

  if (!email) {
    return res.status(400).json({ error: "Correo electrónico requerido." });
  }

  const token = Math.random().toString(36).substr(2);
  const resetLink = `http://localhost:8100/reset-password?token=${token}`;

  const asunto = "Recuperación de Contraseña";
  const mensaje = `
    <h1>Recuperación de Contraseña</h1>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetLink}">Restablecer Contraseña</a>
  `;

  const requestData = {
    email,
    token,
    isValid: true,
  };

  try {
    await enviarCorreo(email, asunto, mensaje); // Enviar correo
    await guardarDatos(requestData); // Guardar JSON

    res.status(200).json({
      message: "Correo enviado y solicitud registrada.",
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Error interno al procesar la solicitud." });
  }
});

server.use(router);

server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
