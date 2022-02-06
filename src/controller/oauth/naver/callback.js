import { useEffect } from "react";
import { connect } from "react-redux";
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
