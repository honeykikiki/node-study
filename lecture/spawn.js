const spawn = require("child_process").spawn;
// const { spawn } = require("child-process");

let process = spawn("python", ["test.py"]);

process.stdout.on("data", function (data) {
  console.log(data.toString());
});

process.stderr.on("data", function () {
  console.error(data.toString());
});
