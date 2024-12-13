const jsonServer = require("json-server");
const cors = require("cors");
const bodyParser = require("body-parser"); // Añadido para parsear el cuerpo de las solicitudes
const enviarCorreo = require("./mailer");
const jsonFile = require("jsonfile");
const path = require("path");
require("dotenv").config(); // Carga las variables del .env

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
async function guardarDatos(data) {
  try {
    const existingData = await jsonFile.readFile(filePath);

    if (!existingData.passwordResetRequest) {
      existingData.passwordResetRequest = [];
    }

    // Verifica si el correo ya tiene un token válido
    const isDuplicate = existingData.passwordResetRequest.some(
      (entry) => entry.email === data.email && entry.isValid
    );

    if (isDuplicate) {
      throw new Error("Ya existe una solicitud activa para este correo.");
    }

    // Agrega la solicitud de restablecimiento
    existingData.passwordResetRequest.push(data);

    await jsonFile.writeFile(filePath, existingData, { spaces: 2 });
    console.log("Datos guardados exitosamente en Data.json");
  } catch (error) {
    console.error("Error al guardar datos en Data.json:", error.message);
    throw error;
  }
}

// Ruta para recuperación de contraseña
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
    <a href="${resetLink}">Restablecer Contraseña</a>
  `;

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
      res.status(409).json({ error: error.message }); // 409: Conflict
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
