const express = require('express');
const sgMail = require('@sendgrid/mail');
const cron = require('node-cron');
const moment = require('moment');
const dotenv = require('dotenv');
const { default: axios } = require('axios');
const app = express();

require('moment-recur');
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

cron.schedule(
  '0 4 * * 2',
  () => {
    const interval = moment(new Date('9/7/2021')).recur().every(2).weeks();

    if (interval.matches(new Date())) {
      const endPeriod = moment().format('M-D-YY');

      axios
        .get('https://api.sendgrid.com/v3/marketing/contacts', {
          headers: { Authorization: `Bearer ${process.env.SENDGRID_API_KEY}` },
        })
        .then((res) => {
          res.data.result.forEach((employee) => {
            const { email, first_name } = employee;
            sgMail
              .send({
                to: email,
                from: process.env.SELF,
                subject: 'Aquatics Timesheet Reminder',
                text: `Hello ${first_name},\n\nThe timesheet ending in ${endPeriod} is due by tonight.  Thank you.\n\nBest,\nBrian`,
              })
              .then(() => {
                console.log(`Email sent to: ${first_name}`);
              })
              .catch((error) => {
                console.error(error.response.body);
              });
          });
        })
        .catch((err) => console.error(err.response.data));
    }
  },
  {
    scheduled: true,
    timezone: 'America/Los_Angeles',
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Connected to Port: ${process.env.PORT}`);
});
