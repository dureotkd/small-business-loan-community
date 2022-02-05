import { connect } from "react-redux";
import { useState, useRef, useEffect, useCallback } from "react";
import JoinView from "../../view/join/joinView";

function Join({ loginUser }) {
  const [user, setUser] = useState({
    id: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [disableButton, setDisableButton] = useState(true);

  const handleSubmitButton = useCallback(() => {
    const validProc = [1];

    for (const valid of validProc) {
      if (
        user.id.length === 0 ||
        user.nickname.length === 0 ||
        user.email.length === 0 ||
        user.password.length === 0 ||
        user.passwordConfirm.length === 0
      ) {
        setDisableButton(true);

        break;
      }

      setDisableButton(false);
    }
  }, [user]);

  useEffect(() => {
    handleSubmitButton();
  }, [handleSubmitButton]);

  const handleInput = (event) => {
    const target = event.target;
    const stateKey = target.getAttribute("id");
    const cloneUser = { ...user };
    cloneUser[stateKey] = target.value;
    setUser(cloneUser);
  };
  const handleSubmit = () => {
    console.log(user);
  };

  return (
    <JoinView
      user={user}
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      disableButton={disableButton}
    />
  );
}

function ChangeToProps(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(ChangeToProps)(Join);
