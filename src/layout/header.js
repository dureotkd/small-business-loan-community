import { useState } from "react";
import { connect } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { StyledLogo, StyledDiv } from "../assets/layout/layoutCss";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { BsFillBellFill } from "react-icons/bs";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { empty } from "../helper/default";
import { useNavigate } from "react-router-dom";

function Header({ loginUser, dispatch }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

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
