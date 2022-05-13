import { useEffect, useState } from "react";
import { fadeIn } from "react-animations";
import styled, { keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ColorName, colors, showed, sounds } from "../../lib/store/game";

const fadeInAnimation = keyframes`${fadeIn}`;

const ColorPlate = styled.div`
  font-size: 20px;
  line-height: 28px;
  padding: 6px 12px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: #fafafa;
  max-width: 256px;
  aspect-ratio: 1 / 1;
  user-select: none;
  animation: 1s ${fadeInAnimation};
`;

const GameShow = () => {
  const dispatch = useAppDispatch();
  const [isStart, setIsStart] = useState(false);
  const isShowing = useAppSelector((state) => state.game.isShowing);
  const gameColors = useAppSelector((state) => state.game.colors);
  const timeBetweenShow = useAppSelector((state) => state.game.timeBetweenShow);

  const [currentColors, setCurrentColors] = useState<ColorName[]>([]);
  const [currentColor, setCurrentColor] = useState<ColorName | undefined>(
    undefined
  );

  let timeout: number;

  const removeFirstColor = () => {
    clearTimeout(timeout);
    if (!isShowing) return;
    setCurrentColors((p) => p.slice(1));
    timeout = setTimeout(removeFirstColor, timeBetweenShow);
    return () => {
      clearTimeout(timeout);
    };
  };

  useEffect(() => {
    const newCurrent = currentColors[0];
    setCurrentColor(newCurrent);

    if (!newCurrent) return;
    sounds[newCurrent].play();
  }, [currentColors]);

  useEffect(() => {
    if (!(currentColors.length === 0 && isStart)) return;
    dispatch(showed(undefined));
    setIsStart(false);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentColors]);

  useEffect(() => {
    if (!isShowing) return;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setCurrentColors(gameColors);
      setIsStart(true);
      timeout = setTimeout(removeFirstColor, timeBetweenShow);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [isShowing, gameColors, timeBetweenShow]);

  return isShowing && currentColor ? (
    <ColorPlate
      key={currentColor.toString() + currentColors.length}
      style={{
        margin: "0 auto",
        backgroundColor: colors[currentColor],
      }}
      children={currentColor.toUpperCase()}
    />
  ) : (
    <ColorPlate />
  );
};

export default GameShow;
