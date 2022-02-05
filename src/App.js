import "./App.css";
import { useState } from "react";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { combineReducers, createStore } from "redux";

import Header from "./layout/header";
import Auth from "./controller/auth/auth";
import Join from "./controller/join/join";
import KaKaoAuth from "./controller/oauth/kakao/callback";
import NaverAuth from "./controller/oauth/naver/callback";

function App() {
  const [loginUser, setLoginUser] = useState({});
  const [theme, setTheme] = useState({
    light: {},
    dark: {},
  });
  const loginUserReducer = (state = loginUser, action) => {
    // const param = action.payload;

    switch (action.type) {
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
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/auth" element={<Auth />} />
          <Route exact path="/oauth/kakao/callback" element={<KaKaoAuth />} />
          <Route exact path="/oauth/naver/callback" element={<NaverAuth />} />
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
