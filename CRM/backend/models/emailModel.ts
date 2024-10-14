import nodemailer from "nodemailer";
import path from "path";

export default class EmailModel {
  destinatario: string;
  assunto: string;
  transporter: nodemailer.Transporter;

  constructor(destinatario: string, assunto: string) {
    this.destinatario = destinatario;
    this.assunto = assunto;
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "", // inserir email do cliente
        pass: "", // inserir senha do email do cliente
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async enviarEmail(descricaoTXT: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: "", // inserir email do cliente
      to: this.destinatario,
      subject: this.assunto,
      text: descricaoTXT,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email enviado: ${info.response}`);
    } catch (err) {
      console.error(`Erro ao enviar email: ${err}`);
    }
  }

  async enviarEmailHTML(descricaoHTML: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: "", // inserir email do cliente
      to: this.destinatario,
      subject: this.assunto,
      html: descricaoHTML,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email enviado: ${info.response}`);
    } catch (err) {
      console.error(`Erro ao enviar email: ${err}`);
    }
  }

  async enviarEmailComAnexo(descricaoTXT: string, pathAnexo: string, nomeArquivo: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: "", // inserir email do cliente
      to: this.destinatario,
      subject: this.assunto,
      text: descricaoTXT,
      attachments: [
        {
          path: path.join(pathAnexo, nomeArquivo),
          filename: nomeArquivo,
        },
      ],
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email enviado: ${info.response}`);
    } catch (err) {
      console.error(`Erro ao enviar email com anexo: ${err}`);
    }
  }

  async sendVerificationEmail(token: string): Promise<void> {
    const verificationLink = `https://seusite.com/verify?token=${token}`;
    const descricaoHTML = `<p>Bem-vindo! Clique no link para confirmar seu registro:</p>
                           <a href="${verificationLink}">Confirmar Registro</a>`;
    await this.enviarEmailHTML(descricaoHTML);
  }

  async sendPasswordResetEmail(token: string): Promise<void> {
    const resetLink = `https://seusite.com/reset-password?token=${token}`;
    const descricaoHTML = `<p>Para redefinir sua senha, clique no link abaixo:</p>
                           <a href="${resetLink}">Redefinir Senha</a>`;
    await this.enviarEmailHTML(descricaoHTML);
  }
}
