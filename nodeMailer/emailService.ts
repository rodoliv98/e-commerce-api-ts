import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

export const sendVerificationEmail = async (userEmail: string, token: string) => {
    const verificationLink = `http://localhost:5173/verify-email?token=${token}`;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: 'Verificação de Email',
        text: `Por favor, clique no link para verificar seu email: ${verificationLink}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (err) {
        console.error('Error sending email:', err);
        throw err;
    }
};

export const sendRecoverPasswordEmail = async (userEmail: string, token: string) => {
    const recoverPasswordLink = `http://localhost:5173/change-password?token=${token}`;

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: userEmail,
        subject: 'Recuperação de Senha',
        text: `Por favor, clique no link para recuperar sua senha: ${recoverPasswordLink}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (err) {
        console.error('Error sending email:', err);
        throw err;
    }
};