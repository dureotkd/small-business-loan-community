import styled from "styled-components";

const StyledHeader = styled.header`
  width: 1260px;
  height: 70px;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: 100;
  transition: top 0.3s ease;
  background: #2c3333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDiv = styled.div``;

const StyledLogo = styled.div`
  margin-left: 20px;
  color: white;
`;

export { StyledHeader, StyledDiv, StyledLogo };
