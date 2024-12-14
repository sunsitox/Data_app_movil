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


//..



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


// Agrega esta ruta después de tus otras rutas existentes
server.post("/tokens", (req, res) => {
  try {
    // Lee el archivo JSON actual
    const data = jsonFile.readFileSync('Data.json');
    
    // Si no existe la colección tokens, créala
    if (!data.tokens) {
      data.tokens = [];
    }

    // Verifica si ya existe un token para este email
    const existingTokenIndex = data.tokens.findIndex(
      token => token.email === req.body.email
    );

    if (existingTokenIndex !== -1) {
      // Actualiza el token existente
      data.tokens[existingTokenIndex] = req.body;
    } else {
      // Agrega un nuevo token
      data.tokens.push(req.body);
    }

    // Guarda el archivo JSON actualizado
    jsonFile.writeFileSync('Data.json', data);

    res.status(201).json(req.body);
  } catch (error) {
    console.error('Error al guardar token:', error);
    res.status(500).json({ error: 'Error al guardar token' });
  }
});


//..

server.use(middlewares);
server.use(router);

server.listen(port);