import React from "react";
import Typography from "../../components/Typography";

const WhyDidIt = () => {
  return (
    <>
      <Typography variant="h2" style={{ marginBottom: "16px" }}>
        Why did I make a game?
      </Typography>
      <Typography style={{ marginBottom: "24px" }}>
        I wanted to make a game for my portfolio and entertainment
      </Typography>
    </>
  );
};

const HowToPlay = () => {
  return (
    <>
      <Typography variant="h2" style={{ marginBottom: "16px" }}>
        How To Play
      </Typography>
      <Typography style={{ marginBottom: "8px" }}>
        You will be shown a sequence of colors and you will need to reproduce it
        by pressing the buttons
      </Typography>
      <Typography style={{ marginBottom: "24px" }}>
        Colors will increase and show faster as you progress
      </Typography>
    </>
  );
};

const Links = () => {
  return (
    <>
      <Typography variant="h2" style={{ marginBottom: "16px" }}>
        Links
      </Typography>
      <Typography
        variant="body1"
        style={{ marginBottom: "24px", display: "block" }}
      >
        <ul>
          <li style={{ marginBottom: "4px" }}>
            <a href="/">GitHub</a>
          </li>
          <li style={{ marginBottom: "4px" }}>
            <a href="https://t.me/bruhabruh4">Creator's telegram</a>
          </li>
        </ul>
      </Typography>
    </>
  );
};

const AboutPage: React.FC = () => {
  return (
    <>
      <Typography variant="h1" style={{ marginBottom: "24px" }}>
        About Project
      </Typography>
      <WhyDidIt />
      <HowToPlay />
      <Links />
      <Typography variant="h2" style={{ marginBottom: "24px" }}>
        MIT License
      </Typography>
    </>
  );
};

export default AboutPage;
