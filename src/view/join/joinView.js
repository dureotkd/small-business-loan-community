import { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { StyledSafeDiv } from "../../assets/default/defaultCss";

export default function JoinView(props) {
  return (
    <StyledSafeDiv>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 4, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 40,
          }}
        >
          <h1>회원가입</h1>
          <TextField
            required
            id="id"
            label="아이디"
            variant="standard"
            style={{ width: 300 }}
            onChange={props.handleInput}
          />
          <TextField
            required
            label="닉네임"
            variant="standard"
            style={{ width: 300 }}
            id="nickname"
            onChange={props.handleInput}
          />
          <TextField
            required
            label="이메일 주소"
            variant="standard"
            id="email"
            style={{ width: 300 }}
            onChange={props.handleInput}
          />
          <TextField
            required
            label="비밀번호"
            type="password"
            autoComplete="current-password"
            variant="standard"
            id="password"
            style={{ width: 300 }}
            onChange={props.handleInput}
          />
          <TextField
            required
            label="비밀번호 확인"
            variant="standard"
            type="password"
            autoComplete="current-password"
            id="passwordConfirm"
            style={{ width: 300 }}
            onChange={props.handleInput}
          />
          <Button
            variant="contained"
            color="success"
            disabled={props.disableButton ? true : false}
            style={{ width: 300 }}
            onClick={props.handleSubmit}
          >
            가입완료
          </Button>
        </div>
      </Box>
    </StyledSafeDiv>
  );
}
