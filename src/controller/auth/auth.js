import { connect } from "react-redux";
import { useCallback, useEffect, useState, useRef } from "react";
import AuthView from "../../view/auth/AuthView";

function Auth({ loginUser }) {
  const naverLoginRef = useRef();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleNaverLogin = () => {
    naverLoginRef.current.firstChild.click();
  };

  return (
    <AuthView
      handleNaverLogin={handleNaverLogin}
      naverLoginRef={naverLoginRef}
      setId={setId}
      setPassword={setPassword}
    />
  );
}

function ChangeToProps(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(ChangeToProps)(Auth);
