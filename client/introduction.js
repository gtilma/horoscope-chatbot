/*
  Requirements:
  
  In JavaScript, write a self invoked function that adds a variable called
  "Introduction" to the top level window namespace. This variable should be an
  object with three properties: a string (name), a number (age), and a function
  (greeting). The function should return, "Hello, my name is [name] and I am
  [age] years old." Outside of the immediately invoked function, set the name
  and age properties of Introduction, then log the result of the greeting method
  to the console.
*/

(function () {
  window.Introduction = {
    name: '',
    age: 0,
    greeting: function () {
      return `Hello, my name is ${this.name} and I am ${this.age} years old.`
    }
  };
})();

window.Introduction.name = 'Cornelius';
window.Introduction.age = 221;
console.log(window.Introduction.greeting());
