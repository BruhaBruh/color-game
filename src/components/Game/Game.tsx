import styled from "styled-components";
import { useAppSelector } from "../../hooks/redux";
import GameButtons from "../GameButtons/GameButtons";
import GameLives from "../GameLives/GameLives";
import GameShow from "../GameShow/GameShow";
import GameUserInput from "../GameUserInput/GameUserInput";

const GameSection = styled.section`
  margin-bottom: 24px;
`;

const Game = () => {
  const userInput = useAppSelector(
    (state) => state.game.userInputColors.length
  );
  return (
    <>
      <GameSection>
        <GameShow />
      </GameSection>
      <GameSection>
        <GameLives />
      </GameSection>
      <GameSection
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))",
          gap: "8px",
        }}
      >
        <GameButtons />
      </GameSection>
      {userInput !== 0 && (
        <GameSection>
          <GameUserInput />
        </GameSection>
      )}
    </>
  );
};

export default Game;
