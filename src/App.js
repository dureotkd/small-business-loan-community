import "./App.css";
import axios from "axios";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { combineReducers, createStore } from "redux";
import { useState, useEffect, useCallback } from "react";

import userApi from "./api/userApi";

import Header from "./layout/header";
import Auth from "./controller/auth/auth";
import Join from "./controller/join/join";
import Main from "./controller/main/main";
import Article from "./controller/article/article";
import KaKaoAuth from "./controller/oauth/kakao/callback";
import NaverAuth from "./controller/oauth/naver/callback";

function App() {
  const [loginUser, setLoginUser] = useState({});
  const [theme, setTheme] = useState({
    light: {},
    dark: {},
  });

  useEffect(() => {
    const initUser = JSON.parse(localStorage.getItem("user"));
    if (initUser) setLoginUser(initUser);
  }, []);

  const loginUserReducer = (state = loginUser, action) => {
    const param = action.payload;

    switch (action.type) {
      case "doLogOut":
        localStorage.removeItem("user");
        window.location.reload(true);

        return {};

      case "doLogin":
        const { user } = param;
        localStorage.setItem("user", JSON.stringify(user));

        return user;

      default:
        return state;
    }
  };

  const store = createStore(
    combineReducers({
      loginUserReducer,
    })
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/article/:id" element={<Article />} />
          <Route exact path="/oauth/kakao/callback" element={<KaKaoAuth />} />
          <Route exact path="/oauth/naver/callback" element={<NaverAuth />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
