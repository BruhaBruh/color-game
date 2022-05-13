import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./game";

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
