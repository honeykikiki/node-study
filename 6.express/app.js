const express = require("express");
const path = require("path");
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(
  (req, res, next) => {
    console.log("모든 요청에 실행하고싶어요");
    next();
  }
  // (req, res, next) => {
  //   throw new Error("에러가 났어요");
  // }
);

// about에서만 사용 가능한 미들 웨어
// app.use("/about",(req, res, next) => {
//   console.log("모든 요청에 실행하고싶어요");
//   next();
// });

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "index.html"));
  // res.writeHead(200, { "Content-Type": "text/plain" });
  // res.end("하이");
  res.send("hello");
  // res.json({ hello: "honey" });
});

app.get("/category/javascript", (req, res) => {
  res.send(`hello javascript`);
});

// 뒤에 어떠한 요청이 많을떄
app.get("/category/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});

app.post("/", (req, res) => {
  res.send("hello express");
});

app.get("/about", (req, res) => {
  res.send("hello express");
});

// 모든 get요청을 다 처리하는 에스터리스크
// app.get("*", (req, res) => {
//   res.send(`hello everybody`);
// });

// 404처리 에러 위에 존재하는 라우터가 없을떄
app.use((req, res, next) => {
  res.status(404).send("404에러다!!!!!!!");
});

// 에러 미들웨어는 매개변수가 꼭 4개여야한다
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("에러났다!!");
});

app.listen(app.get("port"), () => {
  console.log("express 서버 실행");
});
