import { createAsyncThunk } from "@reduxjs/toolkit";
import { YOUTUBE_API_URL } from "../../utils/constants";
import axios from "axios";
import { RootState } from "..";
import { parseData } from "../../utils";
import { HomePageVideos } from "../../Types";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
    "videosAZ/homePageVideos",
    async (isNext: boolean, { getState }) => { // Tomara el metodo de obtencion de estado del kit de herramientas de redux
        const {
            videosAZ: { nextPageToken: nextPageTokenFromState, videos }, // El token de pagina es para el desplazamiento infinito cuando queremos los videos de la pagina siguiente, lo proporciona la api de youtube 
            } = getState() as RootState;

        const {data: { items, nextPageToken },} = await axios.get(
            `${YOUTUBE_API_URL}/search?maxResults=20&q="reactjs projects"&key=${API_KEY}&part=snippet&type=video&${
                isNext ? `pageToken=${nextPageTokenFromState}` : ""
            }`
        );

        const parsedData: HomePageVideos[] = await parseData(items);
        return { parsedData: [...videos, ...parsedData], nextPageToken }
    }
)
