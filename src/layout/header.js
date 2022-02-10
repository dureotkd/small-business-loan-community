import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StyledLogo, StyledDiv } from "../assets/layout/layoutCss";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { BsPencilFill, BsFillBellFill } from "react-icons/bs";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { empty } from "../helper/default";
import { useNavigate } from "react-router-dom";
import QuillEditor from "../component/quillEditor";
import { baseServerUrl } from "../helper/port";
import axios from "axios";

function Header({ loginUser, dispatch }) {
  const navigate = useNavigate();

  const [contents, setContents] = useState("");
  const [title, setTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [writeModal, setWriteModal] = useState(false);

  const openUserMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goMyInfo = () => {
    handleClose();
  };

  const handleLogOut = () => {
    dispatch({
      type: "doLogOut",
    });
  };

  const handleModalOpen = () => {
    setWriteModal(false);
    setModalOpen(true);
  };
  const handleModalClose = () => setModalOpen(false);

  const handleWriteModal = (flag) => {
    if (flag) setModalOpen(false);

    setWriteModal(flag);
  };

  const handleWriteForm = () => {
    axios({
      method: "patch",
      url: `${baseServerUrl}/api/article`,
      params: {
        title,
        contents,
        userSeq: loginUser.seq,
      },
    })
      .then(({ data, status }) => {
        if (status !== 200) {
          alert("알수없는 오류발생");
        } else if (status === 401) {
          alert(data.errorMessage);
        } else {
          alert("작성되었습니다 " + data.seq);
        }
      })
      .catch((err) => {
        console.log("handleWriteForm error" + err);
      });
  };

  return (
    <header>
      <div className="header">
        <StyledLogo>{loginUser.email}</StyledLogo>
        <StyledDiv
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          {!empty(loginUser) ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <BsPencilFill
                style={{
                  color: "white",
                  fontSize: 20,
                  marginRight: 30,
                  cursor: "pointer",
                }}
                onClick={handleWriteModal.bind(this, true)}
              />
              <BsFillBellFill
                style={{
                  color: "white",
                  fontSize: 20,
                  marginRight: 30,
                  cursor: "pointer",
                }}
                onClick={handleModalOpen}
              />
              <Avatar
                alt="profile-img"
                style={{ width: 30, height: 30, cursor: "pointer" }}
                src={loginUser.profileImg}
                onClick={handleClick}
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openUserMenu}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
              >
                <MenuItem onClick={goMyInfo}>정보</MenuItem>
                <MenuItem onClick={handleLogOut}>로그아웃</MenuItem>
              </Menu>
              <Modal
                open={writeModal}
                onClose={handleWriteModal.bind(this, false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="write-box">
                  <input
                    type="text"
                    className="write-title"
                    placeholder="제목을 입력해주세요"
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <QuillEditor setContents={setContents} contents={contents} />
                  <div className="write-save-btn">
                    <Button
                      style={{ marginRight: 15 }}
                      variant="contained"
                      color="error"
                      onClick={() => setWriteModal(false)}
                    >
                      닫기
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleWriteForm}
                    >
                      작성 완료
                    </Button>
                  </div>
                </Box>
              </Modal>
              <Modal
                open={modalOpen}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="alaram-box">
                  <img
                    alt="알림이 없습니다"
                    src="https://community.rememberapp.co.kr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fic-emptyNotice.15ac60d0.svg&w=256&q=75"
                  />
                  <h4 style={{ marginTop: 15 }}>알림이 없습니다</h4>
                </Box>
              </Modal>
            </div>
          ) : (
            <>
              <Button
                variant="contained"
                size="medium"
                style={{
                  display: "flex",
                  backgroundColor: "white",
                  color: "black",
                  marginRight: 10,
                }}
                onClick={() => navigate("/Auth")}
              >
                로그인
              </Button>
              <Button
                variant="contained"
                size="medium"
                onClick={() => navigate("/Join")}
              >
                회원가입
              </Button>
            </>
          )}
        </StyledDiv>
      </div>
    </header>
  );
}

function ChangeToProps(state) {
  return {
    loginUser: state.loginUserReducer,
  };
}

export default connect(ChangeToProps)(Header);
