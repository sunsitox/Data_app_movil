const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("Data.json");
const middlewares = jsonServer.defaults();
const enviarCorreo = require("./mailer");
const port = process.env.PORT || 10000;

// Configuración de CORS más flexible
server.use(cors({
  origin: function (origin, callback) {
    // Lista de dominios permitidos
    const allowedOrigins = [
      'http://localhost:8100', 
      'https://proyecto-mobil-entrega-3-1.onrender.com',
      /^https?:\/\/localhost(:\d+)?$/ // Permite cualquier puerto de localhost
    ];

    // Si no hay origen (como en solicitudes del mismo servidor) o está en la lista permitida
    if (!origin || allowedOrigins.some(allowed => 
      typeof allowed === 'string' 
        ? allowed === origin 
        : allowed.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Manejo de solicitudes OPTIONS (preflight)
server.options("*", cors());

// Middleware para parsear JSON
server.use(require('body-parser').json());
server.use(require('body-parser').urlencoded({ extended: true }));

// Ruta para solicitud de recuperación de contraseña
server.post("/passwordResetRequest", async (req, res) => {
  const email = req.body?.email;

  if (!email) {
    return res.status(400).json({ error: "Correo electrónico requerido." });
  }

  // Generar un token único
  const token = Math.random().toString(36).substr(2);
  const resetLink = `https://proyecto-mobil-entrega-3-1.onrender.com/reset-password?token=${token}`;

  // Configurar el correo
  const asunto = "Recuperación de Contraseña";
  const mensaje = `
    <h1>Recuperación de Contraseña</h1>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetLink}">Restablecer Contraseña</a>`
  ;

  try {
    // Enviar el correo
    await enviarCorreo(email, asunto, mensaje);

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

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});