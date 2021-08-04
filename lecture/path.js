const path = require("path");

path.join(__dirname, "..", "var.js");
path.resolve(__dirname, "..", "/var.js");

console.log(path.join(__dirname, "..", "var.js"));
console.log(path.resolve(__dirname, "..", "/var.js"));
