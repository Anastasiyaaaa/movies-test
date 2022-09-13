import {configureStore} from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import  movieSlice from './movie-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    movie:  movieSlice.reducer
  }
});

export const uiActions = uiSlice.actions;
export const movieActions =  movieSlice.actions;
export default store;