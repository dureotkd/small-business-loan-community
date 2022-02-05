import {
  StyledHeader,
  StyledLogo,
  StyledDiv,
} from "../assets/layout/layoutCss";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <StyledLogo>LOGO</StyledLogo>
      <StyledDiv
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: 20,
        }}
      >
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
      </StyledDiv>
    </StyledHeader>
  );
}
