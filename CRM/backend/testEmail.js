require('dotenv').config();  // Carrega as variáveis de ambiente do arquivo .env
const nodemailer = require('nodemailer');

// Configuração do transportador com credenciais do Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Configuração do email de teste
const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'destinatario@example.com',  // Substitua com um email de teste
  subject: 'Teste de Autenticação Nodemailer',
  text: 'Este é um teste para verificar a autenticação com a senha de app do Gmail.',
};

// Envio do email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Erro ao enviar e-mail:', error);
  } else {
    console.log('E-mail enviado com sucesso:', info.response);
  }
});
