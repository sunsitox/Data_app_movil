const express = require('express'); // O json-server si ya estás usándolo
const bodyParser = require('body-parser');
const enviarCorreo = require('./mailer'); // Importa la función desde mailer.js
require('dotenv').config(); // Para usar las variables del .env

const app = express();
const port = process.env.PORT || 10000;

// Middleware para procesar JSON
app.use(bodyParser.json());

// Ruta para solicitud de recuperación de contraseña
app.post('/password-reset-request', async (req, res) => {
  const email = req.body.email;

  // Generar un token único
  const token = Math.random().toString(36).substr(2);

  // Construir el enlace de recuperación
  const resetLink = `https://tu-aplicacion.com/reset-password?token=${token}`;

  // Configurar el mensaje de correo
  const asunto = 'Recuperación de Contraseña';
  const mensaje = `
    <h1>Recuperación de Contraseña</h1>
    <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
    <a href="${resetLink}">Restablecer Contraseña</a>
  `;

  try {
    await enviarCorreo(email, asunto, mensaje);
    res.status(200).json({ message: 'Correo enviado con éxito.' });
  } catch (error) {
    console.error('Error enviando el correo:', error);
    res.status(500).json({ error: 'No se pudo enviar el correo.' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
