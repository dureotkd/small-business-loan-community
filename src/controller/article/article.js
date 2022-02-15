import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import articleApi from "../../api/articleApi";
import replyApi from "../../api/replyApi";
import { useState, useEffect, useCallback } from "react";
import ArticleView from "../../view/article/articleView";

function Article({ loginUser, dispatch }) {
  const { id } = useParams();
  const [article, setArticle] = useState({});
  const [reply, setReply] = useState("");
  const [replyDisabled, setReplyDisabled] = useState(true);

  const getArticle = useCallback(async () => {
    const { article } = await articleApi.getRowByPk(id);
    setArticle(article);
  }, [id]);

  const goReply = () => {
    replyApi.save({
      seq: loginUser.seq,
      id,
      reply,
    });
  };

  const handleReply = (text) => {
    if (text.length === 0) setReplyDisabled(true);
    else setReplyDisabled(false);

    setReply(text);
  };

  useEffect(() => {
    getArticle();
  }, [getArticle]);

  return (
    <ArticleView
      article={article}
      handleReply={handleReply}
      replyDisabled={replyDisabled}
      goReply={goReply}
    />
  );
}

function ChangeToProps(state) {
  return {
    loginUser: state.loginUserReducer,
  };
}

export default connect(ChangeToProps)(Article);
