import React, { useEffect } from 'react'
import { Navbar } from "../components/Navbar"
import { Sidebar } from "../components/Sidebar"
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import { HomePageVideos } from "../Types";
import Card from "../components/Card";
import { clearVideos } from '../store';

export const Home = () => {

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.videosAZ.videos);

  useEffect(() => {
    return () => {
      dispatch(clearVideos())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getHomePageVideos(false));
    console.log(videos)
  }, [dispatch]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex mt-4" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))} // Metodo de envio para obtener videos de la pagina de inicio, lo pasaremos como verdadero
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={650}
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
              {videos.map((item: HomePageVideos) => {
                return <Card data={item} key={item.videoId} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}
