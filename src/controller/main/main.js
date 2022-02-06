import { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import MainView from "../../view/main/mainView";

function Main({ loginUser }) {
  return <MainView />;
}

function ChangeToProps(state) {
  return {
    loginUser: state.loginUser,
  };
}

export default connect(ChangeToProps)(Main);
