const request = require("supertest");
const { sequelize } = require("../models");
const app = require("../app");

beforeAll(async () => {
  await sequelize.sunc();
});

describe("POST /join", () => {
  test("로그인 안했으면 가입", (done) => {
    request(app)
      .post("/auth/join")
      .send({
        email: "aaa@n.naver",
        nick: "honey",
        password: 1234,
      })
      .expect("Location", "/")
      .expect(302, done);
  });
});

describe("POST /login", () => {
  test("로그인 수행", async (done) => {
    request(app)
      .post("/auth/login")
      .send({
        email: "aaa@n.naver",
        password: 1234,
      })
      .expect("Location", "/")
      .expect(302, done);
  });
});

// describe("POST /logout", () => {});

afterAll(async () => {
  await sequelize.sync({ force: true });
});
