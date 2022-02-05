import { useEffect } from "react";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  KAKAO_AUTH_URL,
  CLIENT_ID,
  NAVER_API_KEY,
} from "../../libaray/oauth/oauth";
import {
  StyledSafeDiv,
  StyledCenterDiv,
  StyledDiv,
  StyledImg,
  StyledSpan,
  StyledH1,
  StyledH4,
} from "../../assets/default/defaultCss";
const { naver } = window;

export default function AuthView(props) {
  useEffect(() => {
    getNaverBtn();
    getUserProfile();
  }, []);

  const getNaverBtn = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: CLIENT_ID,
      callbackUrl: "http://localhost:3000/auth",
      isPopup: false,
      loginButton: { color: "green", type: 1, height: 30 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const getUserProfile = () => {
    window.location.href.includes("access_token") && getUser();
    function getUser() {
      const location = window.location.href.split("=")[1];
      const token = location.split("&")[0];
      console.log("token: ", token);
      fetch(`${NAVER_API_KEY}/account/sign-in`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          localStorage.setItem("access_token", res.token);
        })
        .catch((err) => console.log("err : ", err));
    }
  };

  return (
    <StyledSafeDiv>
      <StyledCenterDiv
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <StyledDiv style={{ marginBottom: 50 }}>
          <StyledH1>회원 로그인</StyledH1>
        </StyledDiv>
        <StyledDiv
          style={{ display: "flex", flexDirection: "column", width: 350 }}
        >
          <TextField
            label="아이디"
            variant="standard"
            onChange={props.handleInput}
            style={{ marginBottom: 20 }}
          />
          <TextField
            label="비밀번호"
            variant="standard"
            type="password"
            onChange={props.handleInput}
            style={{ marginBottom: 30 }}
          />
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#EEEEEE",
              color: "black",
              marginBottom: 40,
            }}
          >
            <StyledSpan>계정 로그인</StyledSpan>
          </Button>
          <StyledH4
            style={{
              marginBottom: 10,
              paddingTop: 10,
            }}
          >
            소셜 계정 로그인
          </StyledH4>
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#fee500",
              color: "black",
              marginBottom: 14,
            }}
            onClick={() => (window.location.href = KAKAO_AUTH_URL)}
          >
            <StyledDiv
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <StyledImg
                alt="KAKAO LOGIN IMG"
                style={{ width: 24, height: 24 }}
                src="https://imki123.github.io/images/kakao.png"
              />
              카카오 로그인
            </StyledDiv>
          </Button>
          <Button
            variant="contained"
            size="large"
            style={{
              backgroundColor: "#60d04c",
              marginBottom: 14,
            }}
            onClick={props.handleNaverLogin}
          >
            <StyledDiv
              style={{
                display: "flex",
                alignItems: "center",
                color: "white",
              }}
            >
              <StyledImg
                alt="NAVER LOGIN IMG"
                style={{ marginRight: 10 }}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNWVmZjVlMy0zYTU4LWMzNGUtYTMxNS0xYTVkYTE5YTBjMjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDNGQzYwNUFDODVEMTFFNDk0NkRCQzQ1MzJEMkZBRDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDNGQzYwNTlDODVEMTFFNDk0NkRCQzQ1MzJEMkZBRDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODAxYjhhMzItZjA4My1kZTQxLTkwMzgtZTIyNzY4ZDZjMWRiIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUwQTE1MTEzODEzMTExRTRBMkQ2RTFBQUFFMDlENUU0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+DvnoVAAAASJJREFUeNpi/P//PwMtARMDjcHwtOAOEH8C4jdA/AGIPwJxIhZ1AkB8H0ntJ6heFMCIJZL/gcTRxP4CsSIQP0YSEwLit2jq/qM7GpsP3mERYwbijVgc8oGQXlLiwBCIm5F9T4tIrgFic1qnovVQ+j006KhugSQQ90HZ3wkpZiHCQFBK4UdTWwjEl4D4HhCLUeqD20Ach0V8HhCrUSOIlIF4ORB3ouchaF6g2AIOqGEVaBmNaqnoL7RYAAF/WhV2sPLkPBDX0joftADxSWIVYyvsfqMlSZACEbRyBpQXHgAxG5reP0DMSsgHr6EF2Xco/QopiGDgORAnQx3zB0nta2IyWgYQ8wLxL6gLv0AxOlgCtYAJaglI7Wdigmi0TkYBAAEGAElhSK5ZcYQXAAAAAElFTkSuQmCC"
              />
              <StyledSpan>네이버 로그인</StyledSpan>
            </StyledDiv>
          </Button>
        </StyledDiv>
      </StyledCenterDiv>
      <div
        id="naverIdLogin"
        ref={props.naverLoginRef}
        style={{ display: "none" }}
      />
    </StyledSafeDiv>
  );
}
