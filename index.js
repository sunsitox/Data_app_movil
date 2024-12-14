const jsonServer = require("json-server");
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router("Data.json");
const middlewares = jsonServer.defaults();
const enviarCorreo = require("./mailer");
const port = process.env.PORT || 10000;



server.use(cors({ origin: 'http://localhost:8100', credentials: true }));

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