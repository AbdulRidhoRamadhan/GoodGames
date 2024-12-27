import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./features/gameSlice";

const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
});

export default store;
