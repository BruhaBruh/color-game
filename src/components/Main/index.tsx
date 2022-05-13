import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import Container from "../Container";

const Wrapper = styled.main`
  width: 100%;
  padding: 32px 16px;
  transition: box-shadow 0.05s ease-in-out;
`;

const Main: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Wrapper id="main">
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Main;
