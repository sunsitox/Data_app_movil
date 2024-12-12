const nodemailer = require('nodemailer');
require('dotenv').config(); // Carga las variables de entorno del archivo .env

// Configura el transporte SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Usa las credenciales desde el archivo .env
    pass: process.env.GMAIL_PASS, // Contraseña de la aplicación generada en Gmail
  },
});

// Función para enviar correos
async function enviarCorreo(destinatario, asunto, mensaje) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: destinatario,
    subject: asunto,
    html: mensaje, // Mensaje en formato HTML
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito: ', info.response);
  } catch (error) {
    console.error('Error enviando el correo: ', error.message);
    throw error; // Propaga el error para manejo en el lugar de la llamada
  }
}

module.exports = enviarCorreo;

