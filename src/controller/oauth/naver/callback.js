import { connect } from "react-redux";
import { StyledSafeDiv } from "../../../assets/default/defaultCss";

function Callback() {
  const code = new URL(window.location.href).searchParams.get("code");

  return <StyledSafeDiv>zz</StyledSafeDiv>;
}

function ChangeToProps(state) {
  return {
    state: state.loginUser,
  };
}

export default connect(ChangeToProps)(Callback);
