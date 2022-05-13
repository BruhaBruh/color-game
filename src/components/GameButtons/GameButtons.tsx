import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import shuffleArray from "../../lib/shuffle";
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

  const [buttons, setButtons] = useState<
    {
      backgroundColor: string;
      onClickHandler: () => void;
      color: string;
    }[]
  >([]);

  useEffect(() => {
    if (!isShowing) return;
    setButtons(
      shuffleArray(
        Object.keys(colors).map((key) => {
          const backgroundColor = colors[key as ColorName];
          return {
            backgroundColor: backgroundColor,
            onClickHandler: () => tryGuess(key as ColorName),
            color: key,
          };
        })
      )
    );
  }, [isShowing]);

  return (
    <>
      {buttons.map((btn) => {
        return (
          <ColorButton
            style={{
              backgroundColor: isShowing ? "#ccc" : btn.backgroundColor,
            }}
            disabled={isShowing}
            onClick={btn.onClickHandler}
            key={btn.color}
          >
            {btn.color.toUpperCase()}
          </ColorButton>
        );
      })}
    </>
  );
};

export default GameButtons;
