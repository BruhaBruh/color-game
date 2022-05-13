import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Container from "../Container";
import Typography from "../Typography";

const Wrapper = styled.header`
  width: 100%;
  height: 64px;
  background-color: #f6f6f6;
  padding: 0 16px;
`;

const Logo = styled.span`
  text-decoration: none;
  color: #222;
`;

const Nav = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavLink = styled.span`
  text-decoration: none;
  color: #005bff;
  font-weight: 500;
`;

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Container
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <Typography variant="h1">
            <Logo>Color Game</Logo>
          </Typography>
        </Link>
        <Nav>
          <Link
            to="/about"
            style={{ textDecoration: "none", marginRight: "8px" }}
          >
            <Typography variant="h2">
              <NavLink>About</NavLink>
            </Typography>
          </Link>
          <Link to="https://github.com/BruhaBruh/color-game" style={{ textDecoration: "none" }}>
            <Typography variant="h2">
              <NavLink>GitHub</NavLink>
            </Typography>
          </Link>
        </Nav>
      </Container>
    </Wrapper>
  );
};

export default Header;
