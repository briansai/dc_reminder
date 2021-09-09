const express = require('express');
const sgMail = require('@sendgrid/mail');
const cron = require('node-cron');
const moment = require('moment');
const dotenv = require('dotenv');
const app = express();

require('moment-recur');
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

cron.schedule('0 4 * * 2', () => {
  const interval = moment(new Date('09/07/2021')).recur().every(2).weeks();

  if (interval.matches(new Date())) {
    const endPeriod = moment().format('M-D-YY');

    const msg = {
      to: process.env.EMPLOYEE1,
      from: process.env.SELF,
      subject: 'Aquatics Timesheet Reminder',
      text: `Hello everyone,\n\nThe timesheet ending in ${endPeriod} is due by tonight.  Thank you.\n\nBest,\nBrian`,
    };

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error.response.body);
      });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Connected to Port: ${process.env.PORT}`);
});

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
