/*
  Requirements:

  In JavaScript and with CSS, create a chat interface to give the user
  information about their astrology sign. The user will land on the page and the
  automated bot will ask, "What's your birthday?" The user can enter their date
  of birth and submit it. The automated bot will inform their user of their sign
  (Virgo, etc.) and then ask if they'd like to receive a horoscope. Depending on
  the user's answer of yes or no, the automated bot should be able to produce a
  horoscope or say goodbye. The horoscope can be as simple or complex as you'd
  like. Please use CSS (do not use Bootstrap or any similar framework) to style
  the conversation to look like a traditional chat based interface (iMessage,
  for example). Make sure to handle any errors for invalid date inputs.
*/

'use strict';

const express = require('express'),
      app = express(),
      server = require('http').Server(app),
      socket = require('socket.io')(server),
      questions = {
        birthday: "What's your birthday? (Month & day)",
        horoscope: "Would you like to read your horoscope?"
      },
      response = {
        badBirthday: "Sorry, something is wrong with your birthday.",
        badDay: "Sorry, something's wrong with your birthday's day of the month.",
        badFormat: "Sorry, I don't recognize that birthday format.",
        badMonth: "Sorry, something's wrong with your birthday month.",
        goodbye: "Bye! Refresh to try again."
      },
      yes = ['yes', 'yeah', 'yea', 'y', 'sure', 'ok'],
      months = require('./months'),
      zodiacSigns = require('./zodiac'); // https://en.wikipedia.org/wiki/Zodiac#Table_of_dates

server.listen(9000, () => {
  console.log('Horoscope Chatbot server listening on port 9000 ...');
});

app.use('/', express.static('client'));

socket.on('connection', (connection) => {
  // Closure variables
  let birthdaySubmitted = false,
      validBirthday = false,
      birthdayString = '',
      userWantsHoroscope = false,
      horoscope = '';

  // Greet user with birthday question on first connection
  socket.emit('botMessage', questions.birthday);

  // Main listener for user input
  connection.on('userMessage', (message) => {
    if (!birthdaySubmitted) {
      validateBirthday(message);
      if (validBirthday) {
        return sendZodiacSign();
      }
    }

    // Flag that user wants horoscope if response begins with 'y'
    if (birthdaySubmitted) {
      userWantsHoroscope = yes.indexOf(message.toLowerCase()) >= 0;
    }

    if (userWantsHoroscope && horoscope) {
      return sendHoroscope(horoscope);
    } else {
      return socket.emit('botMessage', response.goodbye);
    }
  });

  // Validate birthday
  function validateBirthday (message) {
    let validDay = false,
        validMonth = false,
        birthday = message;

    // If birthday does not contain either space or slash, return error
    if (birthday.indexOf(' ') >= 0) {
      birthday = birthday.split(' ');
    } else if (birthday.indexOf('/') >= 0) {
      birthday = birthday.split('/');
    } else {
      return socket.emit('botMessage', response.badFormat)
    }

    let month = birthday[0];

    // If user submitted alphabetic month
    if (/[A-Za-z]/.test(month)) {
      // Match the input to the exact entry in months.json
      month = months.filter(m =>
        m.name === month.toLowerCase()
      )[0];
    }

    // If user submitted numeric month
    else if (/[0-9]/.test(month)) {
      // Match the input to the value in months.json
      month = months.filter(m =>
        parseInt(m.value) === parseInt(month)
      )[0];
    }

    if (month) {
      validMonth = true;
    } else {
      return socket.emit('botMessage', response.badMonth);
    }

    // Check for valid day of month
    const day = leftZero(birthday[1]);
    validDay = 0 < parseInt(day) && parseInt(day) <= month.numDays;

    if (!validDay) {
      return socket.emit('botMessage', response.badDay);
    }

    if (validMonth && validDay) {
      birthdaySubmitted = true;
      validBirthday = true;
      birthdayString = month.value + day;
    }
  }

  // Helper to prepend zero for single digit day
  function leftZero (day) {
    return day.length === 1 ? '0' + day : day;
  }

  // Look up Zodiac sign and return to user
  function sendZodiacSign () {
    const capricorn = zodiacSigns.filter(sign => sign.name === "Capricorn")[0],
          birthdayIsCapricorn = (capricorn.beginDate <= birthdayString) || (birthdayString <= capricorn.endDate),
          // First check special case of Capricorn (12/22 - 1/20)
          zodiacSign = birthdayIsCapricorn ? capricorn :
                       // Otherwise return sign corresponding to date
                       zodiacSigns.filter(sign =>
                         sign.beginDate <= birthdayString && birthdayString <= sign.endDate
                       )[0];

    if (!zodiacSign) {
      return socket.emit('botMessage', '');
    }

    // Create closure to store for answering next question
    horoscope = zodiacSign.horoscope;
    socket.emit('botMessage', `OK, your sign is ${zodiacSign.name}`);
    return socket.emit('botMessage', questions.horoscope);
  }

  // Return the horoscope if requested
  function sendHoroscope (horoscope) {
    return socket.emit('botMessage', horoscope);
  }
});
