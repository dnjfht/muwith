export interface LibraryMyLibraryItem {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
  description: string;
  author: string;
  songs: {
    image: string;
    title: string;
    artist: string;
    album: string;
    date: string;
    duration: string;
    isLikeSong: boolean;
  }[];
}

export interface LibraryOftenListenItem {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
}

export interface LibraryCurrentPlaylistItem {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  isLikeSong: boolean;
}

export interface LibraryListenAgainRecommenedItem {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
  description: string;
}

export interface GetLibraryResponse {
  my_library: LibraryMyLibraryItem[];
  often_listen: LibraryOftenListenItem[];
  _comment: string;
  current_playlist: {
    current_playlist_title: string;
    current_play_list: LibraryCurrentPlaylistItem[];
  };
  listen_again_recommened: {
    id: string;
    title: string;
    data: LibraryListenAgainRecommenedItem[];
  };
}
