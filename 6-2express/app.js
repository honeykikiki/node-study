const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const indexRouter = require("./router");
const userRouter = require("./router/user");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev")); // 개발시 요청과 기록을 남기는 라이브러리
// app.use(morgan("combined")); // 배포시 요청과 기록을 남기는 라이브러리
// app.use((req, res, next) => {
//   if (req.session.id) {
//     express.static(path.join(__dirname, "public"));
//   } else {
//     next();
//   }
// });
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
    },
    // name: "connect.sid",
  })
);
// 데이터 파싱이 자동으로된다 거의 필수
app.use(express.json()); // 클라이언트에서 json데이터를 파싱해서 req.body에 넣어준다
app.use(express.urlencoded({ extended: true })); // formData를 파싱해준다 , true 면 qs false면 querystring
// 이미지 파일을 받을떄는 다른 인코디드로 접근한다 multly

const multer = require("multer");
const fs = require("fs");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html"));
});

// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.send("ok");
// });
// 여러개 받을떄 array, input이 여러개 일떄  = fields, 이미지를 안받을떄 none
app.post("/upload", upload.array("image"), (req, res) => {
  console.log(req.files);
  res.send("ok");
});

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// app.get("/", (req, res, next) => {
//   req.cookies;
//   req.signedCookies; // 쿠키 암호화?
//   // "Set-Cookie": `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
//   res.cookie("name", encodeURIComponent(name), {
//     expires: new Date(),
//     httpOnly: true,
//     path: "/",
//   });
//   res.clearCookie("name", encodeURIComponent(name), {
//     httpOnly: true,
//     path: "/",
//   });
//   res.sendFile(path.join(__dirname, "index.html"));
// });

app.get("/", (req, res) => {
  res.send(`hello express`);
});

app.get("/category/javascript", (req, res) => {
  res.send(`hello javascript`);
});

// 뒤에 어떠한 요청이 많을떄
app.get("/category/:name", (req, res) => {
  res.send(`hello ${req.params.name}`);
});

app.use("/", indexRouter);
app.use("/user", userRouter);

app.post("/", (req, res) => {
  res.send("hello express");
});

app.get("/about", (req, res) => {
  res.send("hello express");
});

app.use((req, res, next) => {
  res.status(404).send("404지롱");
});

// 에러 미들웨어는 매개변수가 꼭 4개여야한다
app.use((err, req, res, next) => {
  console.log(err);
  res.status(200).send("에러났다!!");
});

app.listen(app.get("port"), () => {
  console.log("express 서버 실행");
});
