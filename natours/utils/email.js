import nodemailer from 'nodemailer';
import pug from 'pug';
import htmlTotext from 'html-to-text';

class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Natours-Tours <${process.env.EMAIL_FROM}> `;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }

    // create a transporter
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // send the actual email
  async send(template, subject) {
    // Render HTML based on apug template
    const htmlTemplate = pug.renderFile(`${process.cwd()}/natours/views/emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      htmlTemplate,
      text: htmlTotext.fromString(htmlTemplate),
    };

    // create a transport and send email

    await this.newTransport().sendMail(mailOptions);
  }

  async sendGreet() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your password reset token (valid for only 10 minutes)');
  }
}

// const sendEmail = async (options) => {
//   // create a transporter

//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   // define the email options
//   const mailOptions = {
//     from: 'Musthak S <musthaks2002@gmail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   // actually sent the email
//   await transporter.sendMail(mailOptions);
// };

// console.log(`${process.cwd()}/natours/views/emails/${template}.pug`);

export { Email };
