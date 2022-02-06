const { http } = require("./http/http");
require("./api/api");

http.listen(8080, (req, res) => {
  console.log(`LOAN 서버를 요청 받을 준비가 되었습니다 👩`);
});
