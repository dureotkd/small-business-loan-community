import qs from "qs";
import axios from "axios";
import { connect } from "react-redux";
import AuthView from "../../view/auth/AuthView";
import { useCallback, useEffect, useState, useRef } from "react";
import { getNaverBtn } from "../../libaray/oauth/oauth";

function Auth({ loginUser }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const naverLoginRef = useRef();

  const handleNaverLogin = () => {
    naverLoginRef.current.firstChild.click();
  };

  useEffect(() => {
    getNaverBtn();
  }, []);

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
