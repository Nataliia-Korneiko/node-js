const sgMail = require('@sendgrid/mail');
const Mailgen = require('mailgen');
require('dotenv').config();

const { BASE_API_URL, SENDGRID_API_KEY } = process.env;

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;

  #createTemplate(verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'default',
      product: {
        name: 'System Cats',
        link: BASE_API_URL, // или Heroku
      },
    });
    const template = {
      body: {
        name,
        intro:
          "Welcome to System Cats! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with System Cats, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${BASE_API_URL}/api/users/verify/${verifyToken}`, // или Heroku
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    const emailBody = mailGenerator.generate(template);
    return emailBody;
  }

  // try {} catch (error) {} - не нужен, так как ошибка отловится в services -> users -> create
  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to: email, // Change to your recipient
      from: 'korneyko_ns@ukr.net', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      html: emailBody,
      // text: `Hello ${name}!`,
      // html: emailBody,
    };

    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
