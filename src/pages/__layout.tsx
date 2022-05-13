import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Main from "../components/Main";

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-rows: max-content 1fr;
`;

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Main>{children}</Main>
    </Wrapper>
  );
};

export default Layout;
