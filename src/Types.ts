export interface InitialState {
    videos: HomePageVideos[];
    currentPlaying: null;
    searchTerm: string;
    searchResults: [];
    nextPageToken: string | null;
    recommendedVideos: [];
  }

export interface HomePageVideos {
videoId: string;
videoTitle: string;
videoDescription: string;
videoLink: string;

videoThumbnail: string;
videoDuration: string;
videoViews: string;
videoAge: string;
channelInfo: {
    id: string;
    image: string;
    name: string;
};
}