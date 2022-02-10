import { useEffect } from "react";
import { connect } from "react-redux";
import userApi from "../../../api/userApi";
import { useNavigate } from "react-router-dom";
import { getNaverUser } from "../../../libaray/oauth/oauth";
import { StyledSafeDiv } from "../../../assets/default/defaultCss";

function Callback({ loginUser, dispatch }) {
  const navigate = useNavigate();

  useEffect(() => {
    getOauth();
  }, []);

  const getOauth = async () => {
    const naverUser = await getNaverUser();
    const seq = await userApi.saveOauth(naverUser);
    naverUser.seq = seq;

    dispatch({
      type: "doLogin",
      payload: {
        user: naverUser,
      },
    });

    navigate("/");
  };

  return <StyledSafeDiv></StyledSafeDiv>;
}

function ChangeToProps(state) {
  return {
    state: state.loginUserReducer,
  };
}

export default connect(ChangeToProps)(Callback);
