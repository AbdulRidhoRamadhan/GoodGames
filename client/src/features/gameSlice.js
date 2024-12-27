import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [],
    loading: true,
  },
  reducers: {
    setGames(state, action) {
      state.games = action.payload;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setGames, setLoading } = gamesSlice.actions;
export default gamesSlice.reducer;
