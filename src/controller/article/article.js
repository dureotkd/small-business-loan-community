import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import articleApi from "../../api/articleApi";
import { useState, useEffect, useCallback } from "react";
import ArticleView from "../../view/article/articleView";

function Article({ loginUser, dispatch }) {
  const { id } = useParams();
  const [article, setArticle] = useState({});

  const getArticle = useCallback(() => {
    setArticle(articleApi.getRowByPk(id));
  }, [id]);

  useEffect(() => {
    getArticle();
  }, [getArticle]);

  return <ArticleView article={article} />;
}

function ChangeToProps(state) {
  return {
    loginUser: state.loginUserReducer,
  };
}

export default connect(ChangeToProps)(Article);
