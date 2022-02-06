import qs from "qs";
import axios from "axios";
import { baseServerUrl } from "../../helper/port";

/**
 * KAKAO API
 */
const KAKAO_API_KEY = "3b2e4dda1c84c028be25478bc0c7e594";
const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const KAKAO_CLIENT_ID = `93C9kyxWnDJGI1DY7PmoYBYhLbXabz41`;
const getKaKaoUser = async (code) => {
  let data = null;

  console.log("test");

  const payload = qs.stringify({
    grant_type: "authorization_code",
    client_id: KAKAO_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: code,
    client_secret: KAKAO_CLIENT_ID,
  });

  try {
    // access token 가져오기
    const res = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      payload
    );

    // Kakao Javascript SDK 초기화
    window.Kakao.init(KAKAO_API_KEY);
    // access token 설정
    window.Kakao.Auth.setAccessToken(res.data.access_token);

    // Kakao SDK API를 이용해 사용자 정보 획득
    const { id, kakao_account } = await window.Kakao.API.request({
      url: "/v2/user/me",
    });

    data = {
      id: id,
      email: kakao_account.email,
      profileImg: kakao_account.profile.profile_image_url,
      nickname: kakao_account.profile.nickname,
    };
  } catch (e) {
    console.log("kakao oauth fail", e);
  }

  return data;
};

/**
 * NAVER API
 */
const CLIENT_ID = "tyvdYJ26CG8CTCsKiiQh";
const NAVER_API_KEY = "JBsdgis2lK";

const { naver } = window;

const getNaverBtn = () => {
  const naverLogin = new naver.LoginWithNaverId({
    clientId: CLIENT_ID,
    callbackUrl: "http://localhost:3000/oauth/naver/callback",
    isPopup: false,
    loginButton: { color: "green", type: 1, height: 30 },
    callbackHandle: true,
  });
  naverLogin.init();
};

const getNaverUser = async () => {
  const location = window.location.href.split("=")[1];
  const code = location.split("&")[0];

  const naverLogin = new naver.LoginWithNaverId({
    clientId: CLIENT_ID,
    callbackUrl: "http://localhost:3000/oauth/naver/callback",
    isPopup: false,
    callbackHandle: false,
  });
  naverLogin.init();

  await fetch(`${NAVER_API_KEY}/account/sign-in`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: code,
    },
  })
    .then((res) => {
      return res;
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log("naver err : ", err));

  const data = new Promise((resolve, reject) => {
    naverLogin.getLoginStatus((status) => {
      if (status) {
        const data = {
          id: naverLogin.user.id,
          email: naverLogin.user.email,
          profileImg: naverLogin.user.profile_image,
          nickname: naverLogin.user.nickname,
        };

        localStorage.setItem("user", JSON.stringify(data));

        resolve(data);
      }
    });
  });

  return data;
};

export {
  KAKAO_API_KEY,
  KAKAO_CLIENT_ID,
  KAKAO_AUTH_URL,
  CLIENT_ID,
  REDIRECT_URI,
  NAVER_API_KEY,
  getKaKaoUser,
  getNaverBtn,
  getNaverUser,
};
