import { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import articleApi from "../../api/articleApi";
import MainView from "../../view/main/mainView";

function Main({ loginUser, dispatch }) {
  const navigate = useNavigate();
  const [article, setArticle] = useState([]);

  const getArticle = useCallback(async () => {
    const { articles } = await articleApi.getAll();
    const articleAllData = articles.map((article, index) => {
      let cutBody = article.body.replace(/(<([^>]+)>)/gi, "").substr(0, 12);
      cutBody += "...";

      return {
        ...article,
        cutBody,
      };
    });

    setArticle(articleAllData);
  }, []);

  const goDetail = (seq) => {
    navigate(`article/${seq}`);
  };

  useEffect(() => {
    getArticle();
  }, [getArticle]);

  return <MainView article={article} goDetail={goDetail} />;
}

function ChangeToProps(state) {
  return {
    loginUser: state.loginUserReducer,
  };
}

export default connect(ChangeToProps)(Main);
