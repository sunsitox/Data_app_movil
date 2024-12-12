const jsonServer = require("json-server");
const cors = require("cors");
const bodyParser = require("body-parser"); // Añadido para parsear el body de las solicitudes
const enviarCorreo = require("./mailer");

const server = jsonServer.create();
const router = jsonServer.router("Data.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 10000;

// Configura CORS
server.use(cors({
  origin: [
    'https://proyecto-mobil-entrega-3-1.onrender.com', // Tu dominio de Render
    'http://localhost:8100', // Si usas Ionic serve localmente
    'http://localhost:3000', // Otra opción común para desarrollo
    // Agrega aquí otros dominios según sea necesario
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Manejo de solicitudes OPTIONS (preflight)
server.options("*", cors());

// Añade body-parser para manejar solicitudes JSON
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(middlewares);

// Ruta para recuperación de contraseña
server.post("/password-reset-request", async (req, res) => {
  // Añade manejo de errores si el email no está presente
  if (!req.body || !req.body.email) {
    return res.status(400).json({ error: "Correo electrónico requerido" });
  }

  const email = req.body.email;
  const token = Math.random().toString(36).substr(2);
  const resetLink = `https://tu-app-ionic/reset-password?token=${token}`;

  const asunto = "Recuperación de Contraseña";
  const mensaje = `
    <h1>Recuperación de Contraseña</h1>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetLink}">Restablecer Contraseña</a>
  `;

  try {
    await enviarCorreo(email, asunto, mensaje);
    res.status(200).json({ message: "Correo enviado con éxito." });
  } catch (error) {
    console.error("Error en la solicitud de restablecimiento:", error);
    res.status(500).json({ error: "No se pudo enviar el correo." });
  }
});

server.use(router);

server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});