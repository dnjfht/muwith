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
  type: string;
  artists: ArtistType[];
  images: ListImageType[];
  name: string;
  release_date?: string;
  owner?: OwnerData;
}

export interface ArtistType {
  external_urls: {
    spotify: string;
  };
  followers?: { href: string; total: number };
  genres?: string[];
  href: string;
  id: string;
  images?: ListImageType[];
  name: string;
  popularity?: number;
  type: string;
  uri: string;
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
    images: ListImageType[];
  };
  duration_ms: number;
}
