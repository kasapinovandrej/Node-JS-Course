const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();
setTimeout(() => {
  console.log("Timer 1 finished");
}, 0);
setImmediate(() => {
  console.log("Immediate 1 finished");
});

fs.readFile("./test-file.txt", "utf-8", () => {
  console.log("I/O finished");
  setTimeout(() => {
    console.log("Timer 2 finished");
  }, 0);
  setTimeout(() => {
    console.log("Timer 3 finished");
  }, 3000);
  setImmediate(() => {
    console.log("Immediate 2 finished");
  });

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("Hello from the TOP-LEVEL code");

//TOP-LEVEL
//TIMER 1
//IMMEDIATE 1
//I/O
//Timer 2
//Immediate 2
//Timer 3
