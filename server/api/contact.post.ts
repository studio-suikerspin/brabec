import Mailgun from 'mailgun.js';
import formData from 'form-data';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const config = useRuntimeConfig(event);

    // Initialize Mailgun client
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: config.mailgunApiKey,
      url: 'https://api.eu.mailgun.net', // EU infrastructure
    });

    const domain = config.mailgunDomain;
    const fromEmail = `"Brabec.nl" <brabec@${domain}>`;

    // Build admin notification email HTML
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

    // Send admin notification email
    await mg.messages.create(domain, {
      from: fromEmail,
      to: [config.mailTo],
      subject: 'Nieuwe contactaanvraag ontvangen!',
      html: html,
    });

    // Build user confirmation email HTML
    let userHtml = `<html>
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
          <h3>We hebben uw bericht ontvangen:</h3>
          <ul>`;
    Object.keys(body).forEach((key) => {
      if (body[key]) {
        userHtml += `<li><strong>${key}:</strong> ${body[key]}</li>`;
      }
    });

    userHtml += `</ul>
      <p>Bedankt! We nemen zo spoedig mogelijk contact met u op.</p>
    </body></html>`;

    // Send user confirmation email
    await mg.messages.create(domain, {
      from: fromEmail,
      to: [body.email],
      subject: 'Bedankt voor uw contactaanvraag!',
      html: userHtml,
    });

    return { message: 'Email sent successfully' };
  } catch (error: unknown) {
    console.error('Mailgun error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error: ' + error.message,
    });
  }
});
