import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { firstname, lastname, email, phone, message } = body;

    const data = await resend.emails.send({
      from: process.env.MAIL_FROM
        ? process.env.MAIL_FROM
        : 'info@suikerspin.studio',
      to: process.env.MAIL_TO ? process.env.MAIL_TO : 'info@suikerspin.studio',
      subject: 'Nieuwe contactaanvraag ontvangen!',
      html: `<html>
        <head>
          <style>
            body {
              font-family: Helvetica, sans-serif;
            }
            h3 {
              color: #333;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              margin-bottom: 10px;
            }
          </style>
        </head>
        <body>
            <h3>Nieuwe contactaanvraag ontvangen!</h3>
            <ul>
                <li><b>Voornaam:</b> ${firstname}</li>
                <li><b>Achternaam:</b> ${lastname}</li>
                <li><b>Email:</b> ${email}</li>
                <li><b>Telefoonnummer:</b> ${phone}</li>
                <li><b>Bericht:</b> ${message}</li>
            </ul>
        </body>
      </html>`,
    });

    if (!data) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error: Email not sent',
      });
    }

    return { message: 'Email sent successfully' };
  } catch (error: unknown) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: ' + error.message,
    });
  }
});
