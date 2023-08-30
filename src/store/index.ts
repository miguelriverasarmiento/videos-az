import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "../Types";

const initialState: InitialState = {
    videos: [],
    currentPlaying: null,
    searchTerm: "",
    searchResults: [],
    nextPageToken: null,
    recommendedVideos: [],
};
  
const YoutubeSlice = createSlice({
    name: "videosAZ",
    initialState,
    reducers: {},
    extraReducers:(builder) => {},
})

export const store = configureStore({
    reducer: {
        videosAZ: YoutubeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
