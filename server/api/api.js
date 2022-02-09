const { router } = require("../http/http");

// node js 안에 들어있는 file system
const fs = require("fs"); // 1

/**
 * file 업로드 페키지
 */
const multer = require("multer");

const upload = multer({ dest: "uploadedFile/" }); // 2

// const storage  = multer.diskStorage({ // 2
//   destination(req, file, cb) {
//     cb(null, 'uploadedFile/');
//   },
//   filename(req, file, cb) {
//     cb(null, `${Date.now()}__${file.originalname}`);
//   },
// });

router.get("/", (req, res) => {
  if (!fs.existsSync("./uploadedFile")) fs.mkdirSync("./uploadedFile"); // 2

  res.send("Hello LOAN RESTFUL API ");
});

router.post("/uploadFile", upload.single("image"), (req, res) => {
  const file = req?.file;

  if (!file) {
    req.status(400).send({
      errorMessage: "파일 업로드가 실패하였습니다",
    });
  }

  for (const {
    fieldname,
    originalname,
    mimetype,
    destination,
    filename,
    size,
  } of file) {
  }

  console.log(req.file);
});
