const jsonServer = require("json-server");
const cors = require("cors");
const bodyParser = require("body-parser"); // Middleware para parsear JSON y URL-encoded
const crypto = require("crypto"); // Para generar tokens más seguros
const enviarCorreo = require("./mailer");
require("dotenv").config(); // Carga variables de entorno desde el archivo .env

const server = jsonServer.create();
const router = jsonServer.router("Data.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 10000;

// Configura CORS para aceptar solicitudes de los dominios permitidos
server.use(
  cors({
    origin: [
      'https://proyecto-mobil-entrega-3.onrender.com', // Tu dominio en Render
      'http://localhost:8100', // Usando Ionic Serve localmente
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permitir cookies, si es necesario
  })
);

// Manejo de solicitudes preflight (OPTIONS)
server.options("*", cors());

// Middleware para manejar JSON y solicitudes URL-encoded
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Middleware de registros
server.use((req, res, next) => {
  console.log(`Solicitud ${req.method} en ${req.url} con datos:`, req.body);
  next();
});

// Configurar encabezados para prevenir caché en solicitudes específicas
server.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// Almacenamiento temporal de tokens (en memoria, para propósitos de desarrollo)
// En producción, usar una base de datos
const tokens = {};

// Ruta para recuperación de contraseña
server.post("/password-reset-request", async (req, res) => {
  const email = req.body?.email;

  if (!email) {
    return res.status(400).json({ error: "Correo electrónico requerido" });
  }

  try {
    // Generar un token único y almacenarlo temporalmente
    const token = crypto.randomBytes(32).toString("hex"); // Genera un token seguro
    tokens[email] = token; // Asocia el token al correo (solo para demostración)

    // Enlace para restablecimiento (modificar según sea necesario para producción)
    const resetLink = `http://localhost:8100/reset-password?token=${token}`;

    // Configurar y enviar el correo
    const asunto = "Recuperación de Contraseña";
    const mensaje = `
      <h1>Recuperación de Contraseña</h1>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Si no solicitaste esto, ignora este correo.</p>
    `;

    await enviarCorreo(email, asunto, mensaje);
    console.log(`Token generado para ${email}: ${token}`);
    res.status(200).json({ message: "Correo enviado con éxito." });
  } catch (error) {
    console.error("Error al procesar la solicitud de recuperación:", error.message);
    res.status(500).json({ error: "No se pudo enviar el correo." });
  }
});

// Usar las rutas del servidor JSON
server.use(router);

// Iniciar el servidor
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
