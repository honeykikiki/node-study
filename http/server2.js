const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  try {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    const date = await fs.readFile("./server2.html");
    res.end(date);
  } catch (error) {
    console.error(error);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(err.message);
  }
});
server.listen(8070);

server.on("listening", () => {
  console.log("8070번 포트에서 서버 대기 중입니다!");
});
server.on("error", (error) => {
  console.error(error);
});
