const fs = require("fs");
const file = fs.createWriteStream("./big.txt");

for (let i = 0; i < 100000; i++) {
  file.write("안녕하세요 엄청 큰파일이예요 \n");
}
file.end();
