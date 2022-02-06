const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const router = express.Router();
const session = require("express-session");
const FileStore = require("session-file-store")(session);

app.use(cors());

/**
 * extended 옵션의 경우,
 * true일 경우, 객체 형태로 전달된 데이터내에서 또다른 중첩된 객체를 허용한다는 말이며,
 * false인 경우에는 허용하지 않음
 */
app.use("/api", express.urlencoded({ extended: false }), router);

app.use(
  session({
    httpOnly: true, //자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    secure: false, //https 환경에서만 session 정보를 주고받도록처리
    secret: "secret key", //암호화하는 데 쓰일 키
    resave: false, //세션을 언제나 저장할지 설정함
    saveUninitialized: true, //세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
    cookie: {
      //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
      httpOnly: true,
      Secure: true,
    },
  })
);

module.exports = { http, router };
