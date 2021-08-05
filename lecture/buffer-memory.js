const fs = require("fs");

console.log("before", process.memoryUsage().rss);

const datal = fs.readFileSync("./big.txt");
fs.writeFileSync("./big.txt");

console.log("before", process.memoryUsage().rss);
