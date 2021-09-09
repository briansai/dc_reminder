const express = require('express');
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: process.env.EMPLOYEE1,
  from: process.env.SELF,
  subject: 'Aquatics Timesheet Reminders',
  text: 'Hello staff,\n\nThis is Brian, your Senior Guard.  You will be receiving email reminders every two weeks from this email so it relieves Chris from having to send you a reminder.  This scheduled reminder is automated, so please do not respond to this email directly.  If you have any questions, please reach out to Chris or send me a text.  Thanks!\n\nBest,\nBrian',
};
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(error.response.body);
  });

app.listen(process.env.PORT, () => {
  console.log(`Connected to Port: ${process.env.PORT}`);
});

// const employees = [
//   process.env.SUPERVISOR,
//   process.env.EMPLOYEE1,
//   process.env.EMPLOYEE2,
//   process.env.EMPLOYEE3,
//   process.env.EMPLOYEE4,
//   process.env.EMPLOYEE5,
//   process.env.EMPLOYEE6,
//   process.env.EMPLOYEE7,
//   process.env.EMPLOYEE8,
//   process.env.EMPLOYEE9,
//   process.env.EMPLOYEE10,
//   process.env.EMPLOYEE11,
//   process.env.EMPLOYEE12,
//   process.env.EMPLOYEE13,
//   process.env.EMPLOYEE14,
//   process.env.EMPLOYEE15,
//   process.env.EMPLOYEE16,
//   process.env.EMPLOYEE17,
//   process.env.EMPLOYEE18,
//   process.env.EMPLOYEE19,
// ];

// const promises = employees.map((employee) =>
//   sgMail
//     .send({
//       to: employee,
//       from: process.env.SELF,
//       subject: 'Aquatics Timesheet Reminders',
//       text: 'Hello staff,\n\nThis is Brian, your Senior Guard.  You will be receiving email reminders every two weeks from this email so it relieves Chris from having to send you a reminder.  This scheduled reminder is automated, so please do not respond to this email directly.  If you have any questions, please reach out to Chris or send me a text.  Thanks!\n\nBest,\nBrian',
//     })
//     .then(() => {
//       console.log('Email sent');
//     })
//     .catch((error) => {
//       console.error(error.response.body);
//     })
// );

// Promise.all(promises)
//   .then(() => console.log('ALL DONE!'))
//   .catch((err) => console.error(err));
