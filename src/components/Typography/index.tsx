import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const Heading1 = styled.h1`
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
`;
const Heading2 = styled.h2`
  font-size: 24px;
  line-height: 32px;
  font-weight: 600;
`;
const Heading3 = styled.h3`
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
`;
const Body1 = styled.p`
  font-size: 20px;
  line-height: 28px;
`;
const Body2 = styled.p`
  font-size: 16px;
  line-height: 24px;
`;

type TypographyVariant = "h1" | "h2" | "h3" | "body1" | "body2";

type props = {
  variant?: TypographyVariant;
} & React.HTMLAttributes<HTMLElement>;

const Variants: Record<TypographyVariant, any> = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  body1: Body1,
  body2: Body2,
};

const Typography: React.FC<PropsWithChildren<props>> = ({
  children,
  variant,
  ...props
}) => {
  const Variant = Variants[variant ?? "body1"];

  return <Variant {...props}>{children}</Variant>;
};

export default Typography;
