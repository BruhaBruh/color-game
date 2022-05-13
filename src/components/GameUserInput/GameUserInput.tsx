import { useMemo } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks/redux";
import { colors } from "../../lib/store/game";

const ColorPlate = styled.div`
  border-radius: 4px;
  border: none;
  width: 32px;
  height: 32px;
  aspect-ratio: 1 / 1;
  user-select: none;
`;

const GameUserInput = () => {
  const userInput = useAppSelector((state) => state.game.userInputColors);

  const plates = useMemo(
    () =>
      userInput.map((colorName, index) => (
        <ColorPlate
          key={index}
          style={{
            backgroundColor: colors[colorName],
            marginRight: index !== userInput.length - 1 ? "4px" : undefined,
          }}
        />
      )),
    [userInput]
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {plates}
    </div>
  );
};

export default GameUserInput;
