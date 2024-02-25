// 모든 필요한 타입을 모아둔 파일

export enum AppPage {
  HOME = '/',
  SEARCH = '/search',
  LOGIN = '/login',
  PLAYLIST = '/playlist',
  ALBUM = '/album',
  ARTIST = '/artist',
}

export interface MusicData {
  image: string;
  title: string;
  artist: string;
  album: string;
  date: string;
  duration: string;
  isLikeSong: boolean;
}

export interface RecommenedPlaylistProps {
  title: string;
  datas: PlaylistData;
}

export interface PlaylistData {
  id: string;
  title: string;
  data: Playlist[];
}

export interface Playlist {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
  description: string;
}

export interface LibraryData {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  type: string;
}

export interface CurrentPlayList {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  isLikeSong: boolean;
}
