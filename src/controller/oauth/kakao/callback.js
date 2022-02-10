import userApi from "../../../api/userApi";
import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getKaKaoUser } from "../../../libaray/oauth/oauth";
import { StyledSafeDiv } from "../../../assets/default/defaultCss";

function Callback(props) {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  const getOauth = async () => {
    const kakaoUser = await getKaKaoUser(code);
    const seq = await userApi.saveOauth(kakaoUser);
    kakaoUser.seq = seq;

    props.dispatch({
      type: "doLogin",
      payload: { user: kakaoUser },
    });

    navigate("/");
  };

  useEffect(() => {
    if (code) {
      getOauth();
    }
  }, []);

  return <StyledSafeDiv>zz</StyledSafeDiv>;
}

function ChangeToProps(state) {
  return {
    state: state.loginUserReducer,
  };
}

export default connect(ChangeToProps)(Callback);
