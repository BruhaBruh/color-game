import { useMemo } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ColorName, colors, tryGuessColor } from "../../lib/store/game";

const ColorButton = styled.button`
  font-size: 20px;
  line-height: 28px;
  padding: 6px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: #fafafa;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  user-select: none;
`;

const GameButtons = () => {
  const dispatch = useAppDispatch();
  const isShowing = useAppSelector((state) => state.game.isShowing);

  const tryGuess = (color: ColorName) => {
    dispatch(tryGuessColor(color));
  };

  const ColorButtons = useMemo(() => {
    return Object.keys(colors).map((key) => {
      const backgroundColor = colors[key as ColorName];
      return (
        <ColorButton
          style={{
            backgroundColor: isShowing ? "#ccc" : backgroundColor,
          }}
          disabled={isShowing}
          onClick={() => tryGuess(key as ColorName)}
          key={key}
        >
          {key.toUpperCase()}
        </ColorButton>
      );
    });
  }, [isShowing]);

  return <>{ColorButtons}</>;
};

export default GameButtons;
