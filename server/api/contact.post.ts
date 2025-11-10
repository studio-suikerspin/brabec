export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const { sendMail } = useNodeMailer();

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

    const data = await sendMail({
      to: process.env.NUXT_MAIL_TO
        ? process.env.NUXT_MAIL_TO
        : 'info@suikerspin.studio',
      subject: 'Nieuwe contactaanvraag ontvangen!',
      html: html,
    });

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

    await sendMail({
      to: body.email,
      subject: 'Bedankt voor uw contactaanvraag!',
      html: userHtml,
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
