const fs = require("fs");
const zlib = require("zlib");
const readStream = fs.createReadStream("./read.txt", { highWaterMark: 16 });
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream("./writeme4.txt");

readStream.pipe(zlibStream).pipe(writeStream);
