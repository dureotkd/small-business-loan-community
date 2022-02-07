import { useState } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import MainView from "../../view/main/mainView";

function Main({ loginUser , dispatch }) {



  return <MainView />;
}

function ChangeToProps(state) {
  return {
    loginUser: state.loginUserReducer,
  };
}

export default connect(ChangeToProps)(Main);
