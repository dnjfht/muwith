// 모든 필요한 타입을 모아둔 파일

export enum AppPage {
  HOME = '/',
  SEARCH = '/search',
  LOGIN = '/login',
  PLAYLIST = '/playlist',
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
