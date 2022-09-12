import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


class EmailService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendActivationMail(email: string, activationLink: string): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Ваша ссылка для активации на ${process.env.SITE_URL}`,
      text: '',
      html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${activationLink}">${activationLink}</a>
        </div>
      `
    })
  }
}

const emailService = new EmailService();

export default emailService;