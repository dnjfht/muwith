export interface LibraryResponseMyLibraryItem {
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

export interface LibraryResponseOftenListenItem {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
}

export interface LibraryResponseCurrentPlaylistItem {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  isLikeSong: boolean;
}

export interface LibraryResponseListenAgainRecommenedItem {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
  description: string;
}

export interface LibraryResponse {
  my_library: LibraryResponseMyLibraryItem[];
  often_listen: LibraryResponseOftenListenItem[];
  _comment: string;
  current_playlist: {
    current_playlist_title: string;
    current_play_list: LibraryResponseCurrentPlaylistItem[];
  };
  listen_again_recommened: {
    id: string;
    title: string;
    data: LibraryResponseListenAgainRecommenedItem[];
  };
}
