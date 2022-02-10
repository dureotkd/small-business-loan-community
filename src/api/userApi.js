import axios from "axios";
import { baseServerUrl } from "../helper/port";

const userApi = {};

/**
 * 소셜인증 중복 확인
 */
userApi.chkOauthDup = () => {};

/**
 * 소셜로그인 INSERT
 */
userApi.saveOauth = async (data) => {
  let seq = 0;

  await axios({
    method: "POST",
    url: `${baseServerUrl}/api/oauth`,
    params: {
      data,
    },
  })
    .then(({ status, data }) => {
      if (status !== 200) {
        alert("알수없는 오류");
      } else if (status === 401) {
        alert(data.errorMessage);
      }

      seq = data.seq;
    })
    .catch((err) => {
      console.log(`saveOauth err` + err);
    });

  console.log(`seq: ${seq}`);

  return seq;
};

export default userApi;
