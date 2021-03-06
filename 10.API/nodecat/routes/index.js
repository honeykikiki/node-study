const express = require("express");
const axios = require("axios");

const router = express.Router();

const URL = "http://localhost:8002/v2";

axios.defaults.headers.origin = "http://localhost:4000"; // origin 헤더 추가

const request = async (req, api) => {
  // 토큰 테스트 라우터
  try {
    // 세션에 토큰이 없으면 토큰 발급 시도
    const tokenResult = await axios.post(`${URL}/token`, {
      clientSecret: process.env.CLIENT_SECRET,
    });
    if (tokenResult.data && tokenResult.data.code === 200) {
      // 토큰 발급 성공
      req.session.jwt = tokenResult.data.token; // 세션에 토큰 저장
      return await axios.get(`${URL}${api}`, {
        headers: { authorization: req.session.jwt },
      });
    }
    // 발급받은 토큰 테스트
    // const result = await axios.get(`${URL}/test`, {
    //   headers: { authorization: req.session.jwt },
    // });
    // return res.json(result.data);
  } catch (error) {
    console.error(error);
    if (error.response.status === 419) {
      // 토큰 만료 시
      delete req.session.jwt;
      return request(req, api);
      // return res.json(error.response.data);
    }
    return error.response;
  }
};

router.get("/mypost", async (req, res, next) => {
  try {
    const result = await request(req, "/posts/my");
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/search/:hasahtag", async (req, res, next) => {
  try {
    const result = await request(req, `/posts/hashtag/${encodeURIComponent(req.params.hasahtag)}`);
    res.json(result.data);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/", (req, res) => {
  res.render("main", { key: process.env.CLIENT_SECRET });
});

module.exports = router;
