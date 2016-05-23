const months = [
  { name: "january", value: "01", numDays: 31 },
  { name: "february", value: "02", numDays: 29 },
  { name: "march", value: "03", numDays: 31 },
  { name: "april", value: "04", numDays: 30 },
  { name: "may", value: "05", numDays: 31 },
  { name: "june", value: "06", numDays: 30 },
  { name: "july", value: "07", numDays: 31 },
  { name: "august", value: "08", numDays: 31 },
  { name: "september", value: "09", numDays: 30 },
  { name: "october", value: "10", numDays: 31 },
  { name: "november", value: "11", numDays: 30 },
  { name: "december", value: "12", numDays: 31 }
];

/*
  Data pulled on 5/22 from:
  - https://en.wikipedia.org/wiki/Zodiac#Table_of_dates
  - http://astrology.com
*/
const zodiacSigns = [
  {
    beginDate: "0321",
    endDate: "0420",
    horoscope: "Spending hours reflecting on your own life isn't selfish -- it's essential, especially right now.",
    name: "Aries"
  },
  {
    beginDate: "0421",
    endDate: "0521",
    horoscope: "Some of your bad habits have become too comfortable for you to get rid of.",
    name: "Taurus"
  },
  {
    beginDate: "0522",
    endDate: "0621",
    horoscope: "You will have a kind of high energy today that could blow other people out of the water, if you're not too careful.",
    name: "Gemini"
  },
  {
    beginDate: "0622",
    endDate: "0722",
    horoscope: "The mistakes you've made in the past are all in the past!",
    name: "Cancer"
  },
  {
    beginDate: "0723",
    endDate: "0822",
    horoscope: "If you need to make a good impression on some powerful movers and shakers, today is the right day!",
    name: "Leo"
  },
  {
    beginDate: "0823",
    endDate: "0923",
    horoscope: "Today it might seem like you have some tough choices to make, but if you ask a friend to help you see them in a new light, you will soon see that it's a pretty cut-and-dried situation.",
    name: "Virgo"
  },
  {
    beginDate: "0924",
    endDate: "1023",
    horoscope: "Flirting can be fun, but keep it in perspective -- just because you have great banter with someone doesn't mean that there is any real substance there for you to build a relationship on.",
    name: "Libra"
  },
  {
    beginDate: "1024",
    endDate: "1122",
    horoscope: "A friend who always knows how to stir up the drama is going to test your patience today.",
    name: "Scorpio"
  },
  {
    beginDate: "1123",
    endDate: "1221",
    horoscope: "There is no law stating that you have to do everything you are told, so forgo the blind obedience today.",
    name: "Sagittarius"
  },
  {
    beginDate: "1222",
    endDate: "0120",
    horoscope: "There are so many cultures out there to explore, but jetting to every corner of the earth isn't feasible money-wise or job-wise.",
    name: "Capricorn"
  },
  {
    beginDate: "0121",
    endDate: "0219",
    horoscope: "Someone at work is letting their personal issues get in the way of their responsibilities -- and it might be up to you to make them aware of it over the next few days.",
    name: "Aquarius"
  },
  {
    beginDate: "0220",
    endDate: "0320",
    horoscope: "Even if you don't need to save money right now, you might still find yourself in a penny pinching mood -- and you can only benefit by following it.",
    name: "Pisces"
  }
];

const questions = {
  birthday: "What's your birthday? (Month & day)",
  horoscope: "Would you like to read your horoscope?"
};

const responses = {
  badBirthday: "Sorry, something is wrong with your birthday.",
  badDay: "Sorry, something's wrong with your birthday's day of the month.",
  badFormat: "Sorry, I don't recognize that birthday format.",
  badMonth: "Sorry, something's wrong with your birthday month.",
  goodbye: "Bye! Refresh to try again."
};

const yesAnswers = ['yes', 'yeah', 'yea', 'y', 'sure', 'ok'];

module.exports = {
  months: months,
  zodiacSigns: zodiacSigns,
  questions: questions,
  responses: responses,
  yesAnswers: yesAnswers
};
