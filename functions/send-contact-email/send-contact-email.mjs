import Mailgun from 'mailgun.js';

export default async (request, context) => {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Parse request body
    const body = await request.json();

    // Initialize Mailgun client
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
      url: 'https://api.eu.mailgun.net', // EU infrastructure
    });

    const domain = process.env.MAILGUN_DOMAIN || 'mail.suikerspin.studio';
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
      to: [process.env.MAIL_TO || 'info@suikerspin.studio'],
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

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Mailgun error:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to send email',
        details: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
};
