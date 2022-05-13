import { createSlice } from "@reduxjs/toolkit";

export type GameState = {
  isStarted: boolean;
  isLost: boolean;
  isShowing: boolean;
  lives: number;
  timeBetweenShow: number;
  colors: ColorName[];
  userInputColors: ColorName[];
};

const initialState: GameState = {
  isStarted: false,
  isLost: false,
  isShowing: false,
  lives: 0,
  /* in milliseconds */
  timeBetweenShow: 1000 * 1.5,
  colors: [],
  userInputColors: [],
};

export type ColorName =
  | "red"
  | "blue"
  | "yellow"
  | "green"
  | "purple"
  | "magenta"
  | "pink"
  | "lime"
  | "orange"
  | "black";

export const colors: Record<ColorName, string> = {
  red: "#ef4444",
  blue: "#3b82f6",
  yellow: "#eab308",
  green: "#22c55e",
  purple: "#a855f7",
  magenta: "#d946ef",
  pink: "#ec4899",
  lime: "#84cc16",
  orange: "#f97316",
  black: "#171717",
};

type GameReducer<T = undefined> = (
  state: GameState,
  action?: { type: string; payload: T }
) => void;

const getRandomColor = (): ColorName => {
  const colorNames = Object.keys(colors) as ColorName[];
  const colorIndex = Math.floor(Math.random() * colorNames.length);
  return colorNames[colorIndex];
};

const addColorToState = (state: GameState) => {
  state.colors.push(getRandomColor());
};

const decreaseLiveInState = (state: GameState) => {
  state.lives -= 1;
  state.userInputColors = [];
  state.isShowing = true;
  if (state.lives === 0) {
    state.isStarted = false;
    state.isLost = true;
  }
};

const decreaseTimeBetweenShowInState = (state: GameState) => {
  state.timeBetweenShow = state.timeBetweenShow - state.timeBetweenShow * 0.05;
};

const reducers: Record<string, GameReducer<any>> = {
  startGame: (state) => {
    state.isStarted = true;
    state.lives = 3;
    state.colors = [getRandomColor()];
    state.isShowing = true;
  },
  addColor: addColorToState,
  showed: (state) => {
    state.isShowing = false;
  },
  tryGuessColor: ((state, action) => {
    if (state.isShowing || !state.isStarted || !action) return;
    state.userInputColors.push(action.payload);
    const correctColorSlice = state.colors.slice(
      0,
      state.userInputColors.length
    );
    if (
      JSON.stringify(correctColorSlice) ===
      JSON.stringify(state.userInputColors)
    ) {
      if (state.colors.length === state.userInputColors.length) {
        addColorToState(state);
        if (state.colors.length % 5 === 0) {
          decreaseTimeBetweenShowInState(state);
        }
        state.isShowing = true;
        state.userInputColors = [];
      }
    } else {
      decreaseLiveInState(state);
    }
  }) as GameReducer<ColorName>,
  decreaseLive: decreaseLiveInState,
  decreaseTimeBetweenShow: decreaseTimeBetweenShowInState,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers,
});

export const {
  startGame,
  addColor,
  decreaseLive,
  decreaseTimeBetweenShow,
  showed,
  tryGuessColor,
} = gameSlice.actions;

export default gameSlice;
