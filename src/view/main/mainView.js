import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CgSortAz } from "react-icons/cg";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("안녕하세요", 159, 6.0, 24, 4.0),
  createData("잘부탁드립니다 전세대출 문의드려요", 237, 9.0, 37, 4.3),
  createData("대출 사기당햌ㅆ습니다", 262, 16.0, 24, 6.0),
  createData("..........전세대출", 305, 3.7, 67, 4.3),
  createData("중기청", 356, 16.0, 49, 3.9),
  createData("중기청", 356, 16.0, 49, 3.9),
  createData("중기청", 356, 16.0, 49, 3.9),
  createData("중기청", 356, 16.0, 49, 3.9),
  createData("중기청", 356, 16.0, 49, 3.9),
  createData("중기청", 356, 16.0, 49, 3.9),
  createData("중기청", 356, 16.0, 49, 3.9),
];

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
          {rows &&
            rows.map((row, index) => {
              return (
                <div className="list-card">
                  <div>
                    <h4>안녕하세요</h4>
                    <p className="body-cut">
                      면접 마치고 면접관분들이 엘베 잡아주시고 탈 때까지
                      기다려주셨는데... 이런 것도 시그널로 볼 수 있을까요?{" "}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 12,
                    }}
                  >
                    <div className="">
                      <span>성민</span>
                      <span>2시간전</span>
                    </div>
                    <div>
                      <span>11</span>
                      <span>11</span>
                      <span>13</span>
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
