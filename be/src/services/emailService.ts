import { AppError } from '@errors/index';
import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

// Initialize MailerSend client
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY!,
});

// Function to send password reset email
export const sendPasswordResetEmail = async (
  to: string,
  resetToken: string
): Promise<void> => {
  const sentFrom = new Sender(
    'autorizo@trial-pxkjn418y15lz781.mlsender.net',
    'Autorizo'
  );

  const recipients = [new Recipient(to)];

  const personalization = [
    {
      email: to,
      data: {
        resetToken,
        userInterfaceDomain: process.env.USER_INTERFACE_URL,
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setPersonalization(personalization)
    .setSubject('Recuperar contraseña')
    .setHtml(
      `<p>Dirigete a <a href="{{ userInterfaceDomain }}/reset-password?token={{ resetToken }}">Restaurar Contraseña</a> para restaurar tu contraseña.</p>`
    )
    .setText(
      `Haz click en el siguiente link: {{ userInterfaceDomain }}/reset-password?token={{ resetToken }}`
    );

  try {
    // Attempt to send the email
    await mailerSend.email.send(emailParams);
  } catch (error) {
    new AppError(500, 'Email not sent', [(error as object).toString()]);
  }
};
