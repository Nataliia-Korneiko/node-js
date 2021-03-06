const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')

dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const msg = {
  // to: 'andrzubrytskyi@gmail.com', // Change to your recipient
  to: 'korneyko_ns@ukr.net',
  from: 'andreizubritskiy@gmail.com', // Change to your verified sender (https://app.sendgrid.com/ -> Senders)
  subject: 'Sending with SendGrid is Fun',
  html: '<strong>Easy to do anywhere, even with Node.js</strong>',
}

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
