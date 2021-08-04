const fs = require("fs");

async function main() {
  let data = await fs.readFile("./read.txt");
  console.log("1번", data.toString());
  data = await fs.readFile("./read.txt");
  console.log("2번", data.toString());
  data = await fs.readFile("./read.txt");
  console.log("3번", data.toString());
  data = await fs.readFile("./read.txt");
  console.log("4번", data.toString());
}
main();

// fs.readFile("./read.txt")
//   .then((data) => {
//     console.log("1번", data.toString());
//   })
//   .then((data) => {
//     console.log("2번", data.toString());
//   })
//   .then((data) => {
//     console.log("3번", data.toString());
//   })
//   .then((data) => {
//     console.log("4번", data.toString());
//   });
// // .catch((err) => {
// //   throw err;
// // });
