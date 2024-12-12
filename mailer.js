const nodemailer = require('nodemailer');
require('dotenv').config(); // Para cargar las variables del archivo .env

// Configurar el transportador SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Correo electrónico
    pass: process.env.GMAIL_APP_PASSWORD, // Contraseña de la aplicación o clave de acceso
  },
});

// Función para enviar correos
async function enviarCorreo(destinatario, asunto, mensaje) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: destinatario,
    subject: asunto,
    html: mensaje, // Contenido HTML del correo
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
  } catch (error) {
    console.error('Error enviando el correo:', error);
  }
}

module.exports = enviarCorreo;
