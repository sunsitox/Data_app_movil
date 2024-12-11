const jsonServer = require("json-server");
const cors = require("cors");
const enviarCorreo = require("./mailer");

const server = jsonServer.create();
const router = jsonServer.router("Data.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 10000;

// Configura CORS
server.use(cors({
  origin: "*", // Cambia "*" por el dominio específico en producción
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
  credentials: true, // Si usas cookies o tokens
}));

// Manejo de solicitudes OPTIONS (preflight)
server.options("*", cors()); // Responde a todas las solicitudes OPTIONS

server.use(middlewares);

// Ruta para recuperación de contraseña
server.post("/password-reset-request", async (req, res) => {
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
    res.status(500).json({ error: "No se pudo enviar el correo." });
  }
});

server.use(router);
server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
