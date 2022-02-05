const REST_API_KEY = "3b2e4dda1c84c028be25478bc0c7e594";
const REDIRECT_URI = "http://localhost:3000/auth";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

const CLIENT_ID = "tyvdYJ26CG8CTCsKiiQh";
const NAVER_API_KEY = "JBsdgis2lK";

export { KAKAO_AUTH_URL, CLIENT_ID, NAVER_API_KEY };
