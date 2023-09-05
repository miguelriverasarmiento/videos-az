import axios from "axios";
import {
  convertRawViewstoString,
  parseVideoDuration,
  timeSince,
} from "./index";
import { YOUTUBE_API_URL } from "./constants";
import { HomePageVideos } from "../Types";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

// Obtinene los datos sin procesar de los detalles de youtube
export const parseData = async (items: any[]) => {
  try {
    const videoIds: string[] = []; // Matriz vacia para todas las identificaciones de video
    const channelIds: string[] = []; // Matriz vacia para todas las identificaciones de canal

    items.forEach((item: { snippet: { channelId: string }; id: { videoId: string } }) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });

    const {data: { items: channelsData },} = await axios.get(
      `${YOUTUBE_API_URL}/channels?part=snippet,contentDetails&id=${channelIds}&key=${API_KEY}`
    ); // Se obtienen los canales
    
    const parsedChannelsData: { id: string; image: string }[] = []; // Matriz vacia definimos tipo
    
    channelsData.forEach(
      (channel: {
        id: string; // Definimos tipo
        snippet: { thumbnails: { default: { url: string } } }; // Definimos tipo
      }) =>
        parsedChannelsData.push({ // Colocamos el id y la imagen del canal
          id: channel.id,
          image: channel.snippet.thumbnails.default.url,
        })
    );

    const {
      data: { items: videosData }, // Obtenemos la parte de estadisiticas de videos
    } = await axios.get(
      `${YOUTUBE_API_URL}/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`
    );
    
    const parsedData: HomePageVideos[] = []; // Definimos tipo para matriz de datos de analisis

    items.forEach(
      (
        item: {
          snippet: {
            channelId: string;
            title: string;
            description: string;
            thumbnails: { medium: { url: string } }; // Desestructurando y reestructurando el codigo de cada iteracion de items  
            publishedAt: Date;
            channelTitle: string;
          };
          id: { videoId: string };
        },
        index: number
      ) => {
        const { image: channelImage } = parsedChannelsData.find(
          (data) => data.id === item.snippet.channelId
        )!;
        
        if (channelImage) // Si no obtenemos la imagen del canal agregamos esto al error de datos porque algunos videos no tienen imagen de canal, asi que lo omitiremos
          parsedData.push({
            videoId: item.id.videoId,
            videoTitle: item.snippet.title,
            videoDescription: item.snippet.description,
            videoThumbnail: item.snippet.thumbnails.medium.url,
            videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            videoDuration: parseVideoDuration(
              videosData[index].contentDetails.duration
            ),
            videoViews: convertRawViewstoString(
              videosData[index].statistics.viewCount
            ),
            videoAge: timeSince(new Date(item.snippet.publishedAt)),
            channelInfo: {
              id: item.snippet.channelId,
              image: channelImage,
              name: item.snippet.channelTitle,
            },
          });
      }
    );

    return parsedData;
  } catch (err) {
    console.log(err);
  }
};
