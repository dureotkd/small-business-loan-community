import { useState, useMemo } from "react";
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
//이렇게 라이브러리를 불러와서 사용하면 됩니다
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Header({ loginUser, dispatch }) {
  const navigate = useNavigate();

  const [contents, setContents] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
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
    alert("ㅋㅋ");
  };

  // quill에서 사용할 모듈을 설정하는 코드 입니다.
  // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["image", "video"],
        ],
        handlers: {},
      },
    }),
    []
  );

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
                  />
                  <ReactQuill
                    value={contents}
                    onChange={setContents}
                    modules={modules}
                    theme="snow"
                    placeholder="내용을 입력해주세요."
                  />
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
