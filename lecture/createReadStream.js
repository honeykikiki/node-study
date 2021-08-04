const fs = require("fs");

const readStream = fs.createReadStream("./readme3.txt", { highWaterMark: 16 });
const data = [];
readStream.on("data", (chumk) => {
  data.push(chumk);
  console.log("data", chumk, chumk.length);
});
readStream.on("end", () => {
  console.log("end", Buffer.concat(data).toString());
});
readStream.on("error", (err) => {
  console.log("error", err);
});
