import { createSlice } from "@reduxjs/toolkit";
import { Howl, HowlOptions } from "howler";
import hitHurt from "../../../sounds/hitHurt.wav";
import sound0 from "../../../sounds/tone (0).wav";
import sound1 from "../../../sounds/tone (1).wav";
import sound2 from "../../../sounds/tone (2).wav";
import sound3 from "../../../sounds/tone (3).wav";
import sound4 from "../../../sounds/tone (4).wav";
import sound5 from "../../../sounds/tone (5).wav";
import sound6 from "../../../sounds/tone (6).wav";
import sound7 from "../../../sounds/tone (7).wav";
import sound8 from "../../../sounds/tone (8).wav";
import sound9 from "../../../sounds/tone (9).wav";

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

const getSoundOptions = (sound: string): HowlOptions => {
  return {
    src: [sound],
    autoplay: false,
    loop: false,
    volume: 0.35,
  };
};

export const hitSound = new Howl(getSoundOptions(hitHurt));
export const sounds: Record<ColorName, Howl> = {
  red: new Howl(getSoundOptions(sound0)),
  blue: new Howl(getSoundOptions(sound1)),
  yellow: new Howl(getSoundOptions(sound2)),
  green: new Howl(getSoundOptions(sound3)),
  purple: new Howl(getSoundOptions(sound4)),
  magenta: new Howl(getSoundOptions(sound5)),
  pink: new Howl(getSoundOptions(sound6)),
  lime: new Howl(getSoundOptions(sound7)),
  orange: new Howl(getSoundOptions(sound8)),
  black: new Howl(getSoundOptions(sound9)),
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

const getMainComponent = () => {
  return document.querySelector("#main");
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
      sounds[action.payload].play();
      if (state.colors.length === state.userInputColors.length) {
        addColorToState(state);
        if (state.colors.length % 5 === 0) {
          decreaseTimeBetweenShowInState(state);
        }
        state.isShowing = true;
        state.userInputColors = [];
      }
    } else {
      hitSound.play();
      const main = getMainComponent();
      if (main) {
        main?.classList.toggle("hurt");
        setTimeout(() => {
          main?.classList.toggle("hurt");
        }, 200);
      }
      addColorToState(state);
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
