import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    let html = `<html>
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
          <ul>`;
    Object.keys(body).forEach((key) => {
      if (body[key]) {
        html += `<li><strong>${key}:</strong> ${body[key]}</li>`;
      }
    });

    html += `</ul></body></html>`;

    const data = await resend.emails.send({
      from: process.env.MAIL_FROM
        ? process.env.MAIL_FROM
        : 'info@suikerspin.studio',
      to: process.env.MAIL_TO ? process.env.MAIL_TO : 'info@suikerspin.studio',
      subject: 'Nieuwe contactaanvraag ontvangen!',
      html: html,
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
