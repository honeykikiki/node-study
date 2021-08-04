// const string = "abc";
// const number = 1;
// const boolean = true;
// const obj = {
//   outside: {
//     inside: {
//       key: "value",
//     },
//   },
// };
// console.time("젠체시간");
// console.log("평범한 로그입니다, 쉽표로 구분해 여러 값을 찍을수 있습니다");
// console.log(string, number, boolean);
// console.error("에러메세지는 console.error 에 담아주세요");

// console.table([
//   { name: "zero", birth: 1994 },
//   { name: "hero", birth: 1988 },
// ]);

// console.dir(obj, { colors: false, depth: 2 });
// console.dir(obj, { colors: true, depth: 1 });

// console.time("시간측정");
// for (let i = 0; i < 100000; i++) {}
// console.timeEnd("시간측정");

// function b() {
//   console.trace("에러 위치 추적");
// }

// function a() {
//   b();
// }
// a();
// console.timeEnd("전체시간");

// const timeout = setTimeout(() => {
//   console.log("1.5");
// }, 1500);

// const interval = setInterval(() => {
//   console.log("1sec");
// }, 1000);

// const timeout2 = setTimeout(() => {
//   console.log("x");
// }, 3000);

// setTimeout(() => {
//   clearTimeout(timeout2);
//   clearInterval(interval);
// }, 2500);

// const immediate = setImmediate(() => {
//   console.log("o");
// });

// const setImmediate2 = setImmediate(() => {
//   console.log("x");
// });

// clearImmediate(setImmediate2);

// console.log(__filename);
// console.log(__dirname);

console.log(console.cpus());
