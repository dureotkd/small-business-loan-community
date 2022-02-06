const { router } = require("../http/http");

router.get("/", (req, res) => {
  res.send("Hello LOAN RESTFUL API ");
});

// router.get("/users/me", (req, res) => {
//   console.log(req.session);

//   res.send({});
// });

// router.post("/auth", (req, res) => {
//   const { data } = req.query;

//   const userData = JSON.parse(data);

//   if (!userData) {
//     res.status(400).send({
//       errorMessage: "로그인에 실패하였습니다",
//     });
//     return;
//   }

//   req.session = {
//     loginUser: "zz",
//   };

//   console.log("zzzzzzz", req.session);

//   res.send({});
// });
