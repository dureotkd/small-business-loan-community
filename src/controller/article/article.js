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
  const [replies, setReplies] = useState([]);
  const [replyDisabled, setReplyDisabled] = useState(true);

  const getArticleData = useCallback(async () => {
    const { article } = await articleApi.getRowByPk(id);

    const { replies } = await replyApi.getAll(id);

    setArticle(article);
    setReplies(replies);
  }, [id]);

  /**
   * 총 댓글 가져오기
   */
  const goReply = () => {
    replyApi.save({
      seq: loginUser.seq,
      id,
      reply,
    });

    const cloneReplies = [...replies, { body: reply }];
    setReplies(cloneReplies);
  };

  /**
   * 댓글 입력폼 핸들링
   */
  const handleReply = (text) => {
    if (text.length === 0) setReplyDisabled(true);
    else setReplyDisabled(false);

    setReply(text);
  };

  useEffect(() => {
    getArticleData();
  }, [getArticleData]);

  return (
    <ArticleView
      article={article}
      handleReply={handleReply}
      replyDisabled={replyDisabled}
      goReply={goReply}
      replies={replies}
    />
  );
}

function ChangeToProps(state) {
  return {
    loginUser: state.loginUserReducer,
  };
}

export default connect(ChangeToProps)(Article);
