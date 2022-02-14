import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

export default function MainView(props) {
  return (
    <main className="safe-area-view">
      <div className="main-wrap">
        <aside>
          <Accordion>
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  className="safe-logo"
                  src={process.env.PUBLIC_URL + `/img/safe-logo.png`}
                  alt="safe-logo"
                />
                <h4 style={{ marginTop: -4 }}>전세 안전 계산기</h4>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  className="safe-logo"
                  src={process.env.PUBLIC_URL + `/img/money-icon.png`}
                  alt="safe-logo"
                />
                <h4 style={{ marginTop: -4 }}>중기청 이자 계산기</h4>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </aside>
        <div className="contents">
          <div className="best-contents">
            <div className="contents-header">
              <h3>베스트 글</h3>
              <span>전체보기</span>
            </div>
            <ul style={{ padding: 12, backgroundColor: "white" }}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <b style={{ color: "red" }}>1</b>
                  <p style={{ marginLeft: 6 }}>
                    인터뷰 참석 후 감사 이메일 보내시는지요?
                  </p>
                </div>
                <span>좋아요 33</span>
              </li>
            </ul>
          </div>
          {props.article &&
            props.article.map((val, index) => {
              return (
                <div
                  className="list-card"
                  key={val.seq}
                  onClick={props.goDetail.bind(this, val.seq)}
                >
                  <div>
                    <h4>{val.title}</h4>
                    <p className="body-cut">{val.cutBody}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 12,
                    }}
                  >
                    <div className="">
                      <span>{val.nickname}</span>
                      <span>2시간전</span>
                    </div>
                    <div>
                      <span>{val.hit}</span>
                      <span>{val.like}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </main>
  );
}
