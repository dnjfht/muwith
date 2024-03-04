// 모든 필요한 타입을 모아둔 파일

export enum AppPage {
  HOME = '/',
  SEARCH = '/search',
  LOGIN = '/login',
  PLAYLIST = '/playlist',
  ALBUM = '/album',
  ARTIST = '/artist',
  TRACK = '/track',
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

export interface ListImageType {
  height: number;
  url: string;
  width: number;
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

export interface ListData {
  id: string;
  name: string;
  thumbnailUrl: string;
  totalTracks?: number;
  releaseDate?: string;
  description?: string;
}

export interface ArtistType {
  id: string;
  name: string;
}

export interface OwnerData {
  display_name: string;
}

export interface TrackType {
  id: string;
  name: string;
  artists: ArtistType[];
  album: {
    name: string;
    thumbnailUrl: string;
  };
  duration: number;
  youtubeUrl: string;
}
