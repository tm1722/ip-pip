import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, text: string) {
  await resend.emails.send({
    from: 'Project Ideation <noreply@yourdomain.com>',
    to,
    subject,
    text,
  });
}
