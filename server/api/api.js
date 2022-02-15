const { router } = require("../http/http");
// node js 안에 들어있는 file system
const fs = require("fs"); // 1
const ip = require("ip");

/**
 * file 업로드 페키지
 */
const multer = require("multer");
const moment = require("moment");
const upload = multer({ dest: "../public/uploadedFile/" }); // 2
const userModel = require("../model/user/userModel");
const articleModel = require("../model/article/articleModel");
const replyModel = require("../model/reply/replyModel");

router.get("/", (req, res) => {
  // if (!fs.existsSync("./uploadedFile")) fs.mkdirSync("./uploadedFile"); // 2

  res.send("Hello LOAN RESTFUL API ");
});

router.post("/oauth", async (req, res) => {
  const data = req?.query?.data;

  if (!data) {
    req.status(401).send({
      errorMessage: "소셜 로그인 데이터가 없습니다",
    });
    return;
  }

  const { id, email, profileImg, nickname } = JSON.parse(req.query.data);

  const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const nowIp = ip.address();

  const row = await userModel.findByOauthId(id);
  const procType = row ? "UPDATE" : "INSERT";

  switch (procType) {
    case "INSERT":
      await userModel.save({
        oauthId: id,
        id: email,
        email: email,
        nickname: nickname,
        profile: profileImg,
        regDate: nowDate,
        editDate: nowDate,
        regIp: nowIp,
        editIp: nowIp,
      });

      const { seq } = await userModel.findByOauthId(id);

      res.send({
        seq,
      });

      break;

    case "UPDATE":
      let where = [];
      where.push(`oauthId = '${id}'`);

      await userModel.update(
        {
          oauthId: id,
          id: email,
          email: email,
          nickname: nickname,
          profile: profileImg,
          editDate: nowDate,
          editIp: nowIp,
        },
        where
      );

      res.send({
        seq: row.seq,
      });

      break;

    default:
      break;
  }
});

router.patch("/article", async (req, res) => {
  const { contents, userSeq, title } = req.query;

  const valids = [1];
  let errorMessage = "";

  for (const valid of valids) {
    if (!title) {
      errorMessage = "제목을 입력해주세요";
      break;
    }
    if (!contents) {
      errorMessage = "내용을 입력해주세요";
      break;
    }
    if (!userSeq) {
      errorMessage = "회원번호가 업습니다";
      break;
    }
  }

  if (errorMessage) {
    res.status(401).send({
      errorMessage,
    });
  }

  const nowDate = moment().format("YYYY-MM-DD HH:mm:ss");
  const nowIp = ip.address();

  const lastSeq = await articleModel.save({
    userSeq,
    title,
    body: contents,
    regDate: nowDate,
    editDate: nowDate,
    regIp: nowIp,
    editIp: nowIp,
  });

  res.send({
    seq: lastSeq,
  });
});

router.patch("/reply", async (req, res) => {
  res.send({});
});

router.get("/article", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    res.status(401).send({
      errorMessage: "존재하지 않는 게시글입니다",
    });
    return;
  }

  const article = await articleModel.getRowByPk(id);

  res.send({
    article,
  });
});

router.get("/replies", async (req, res) => {});

router.post("/uploadFile", upload.single("image"), (req, res) => {
  const file = req?.file;

  if (!file) {
    res.status(400).send({
      errorMessage: "파일 업로드가 실패하였습니다",
    });
  }

  res.send({
    filePath: `uploadedFile/${file.filename}`,
  });
});
