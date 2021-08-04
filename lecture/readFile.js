const fs = require("fs").promises;

fs.writeFile("./writeme.txt", "글이 입력됩니다")
  .then(() => {
    console.log(data);
    console.log(data.toString());
  })
  // .then((data) => {
  //   console.log(data.toString());
  // })
  .catch((err) => {
    if (err) {
      throw err;
    }
  });
