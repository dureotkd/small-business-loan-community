export default function ArticleView({
  article,
  handleReply,
  replyDisabled,
  goReply,
}) {
  if (!article) {
    return (
      <div className="article-empty">
        <h3>게시글이 없습니다</h3>
      </div>
    );
  }

  return (
    <main className="safe-area-view">
      <div className="contents-card">
        <div className="title-card">
          <h2>{article.title}</h2>
          <div style={{ display: "flex", alignItems: "center", marginTop: 15 }}>
            <div>
              <img
                className="article-profile"
                src={article.profile}
                alt="profile"
              />
              <span>{article.nickname}</span>
            </div>
            <div></div>
          </div>
        </div>
        <div
          className="body-card"
          dangerouslySetInnerHTML={{ __html: article.body }}
        ></div>
        <div className="reply-write-box">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(event) => handleReply(event.target.value)}
            placeholder="댓글을 입력해주세요"
          ></textarea>
          <input
            type="submit"
            onClick={goReply}
            className="reply-save-btn"
            disabled={replyDisabled}
            value="저장"
          />
        </div>
        <div className="reply-card">
          <h4>댓글 67</h4>
        </div>
      </div>
    </main>
  );
}
