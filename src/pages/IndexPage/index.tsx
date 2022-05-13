import React from "react";
import styled from "styled-components";
import Game from "../../components/Game/Game";
import Typography from "../../components/Typography";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { startGame } from "../../lib/store/game";

const StartButton = styled.button`
  font-size: 20px;
  line-height: 28px;
  padding: 6px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #005bff;
  color: #fafafa;
  cursor: pointer;
  margin: 0 auto;
`;

const IndexPage: React.FC = () => {
  const isStarted = useAppSelector((state) => state.game.isStarted);
  const isLost = useAppSelector((state) => state.game.isLost);
  const level = useAppSelector((state) => state.game.colors.length);
  const dispatch = useAppDispatch();

  const handleStartGameClick = () => {
    dispatch(startGame(undefined));
  };

  return (
    <>
      {isStarted ? (
        <Game />
      ) : (
        <>
          <StartButton onClick={handleStartGameClick}>Start game</StartButton>
          {isLost && (
            <>
              <Typography
                variant="h2"
                style={{ marginTop: "16px", textAlign: "center" }}
              >
                You are lost :c
              </Typography>
              <Typography
                variant="body1"
                style={{ marginTop: "8px", textAlign: "center" }}
              >
                Your level is {level}
              </Typography>
            </>
          )}
        </>
      )}
    </>
  );
};

export default IndexPage;
