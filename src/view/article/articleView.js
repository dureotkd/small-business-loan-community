export default function ArticleView({ article }) {
  if (!article) {
    return (
      <div className="article-empty">
        <h3>게시글이 없습니다</h3>{" "}
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
      </div>
    </main>
  );
}
