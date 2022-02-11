export default function ArticleView({ article }) {
  return (
    <main className="safe-area-view">
      {article ? (
        <div>안녕하세요 ㅎㅎ</div>
      ) : (
        <div className="article-empty">
          <h3>게시글이 없습니다</h3>{" "}
        </div>
      )}
    </main>
  );
}
