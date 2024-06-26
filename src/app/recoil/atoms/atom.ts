import { Track } from '@/app/types/api-responses/track';
import { atom } from 'recoil';

export const SidebarWidthState = atom({
  key: 'sidebarWidthState',
  default: 0,
});

export const OpenCurrentPlayTrackDetailState = atom({
  key: 'OpenCurrentPlayTrackDetailState',
  default: false,
});

export const PageWidthState = atom({
  key: 'PageWidthState',
  default: 0,
});

export const PageResponsiveNumState = atom({
  key: 'PageResponsiveNumState',
  default: 0,
});

export const PlayerDataState = atom<YT.Player | null>({
  key: 'PlayerDateState',
  default: null,
});

export const CurrentPlayListDataState = atom<string[]>({
  key: 'CurrentPlayListDataState',
  default: [],
});

// 현재 재생 중인 곡, 앞으로 재생될 곡 리스트에서 현재 재생 중인 곡이 몇 번째인지
export const CurrentTrackIndexState = atom({
  key: 'CurrentTrackIndexState',
  default: -1,
});

// 현재 재생 중인 곡
export const CurrentTrackDataState = atom<Track | null>({
  key: 'CurrentTrackDataState',
  default: null,
});

// 현재 재생된 시간
export const CurrentTimeState = atom<number>({
  key: 'CurrentTimeState',
  default: 0,
});

// 현재 재생 중인 곡, 앞으로 재생될 곡 리스트 타이틀
export const CurrentPlaylistTitle = atom<string>({
  key: 'CurrentPlaylistTitle',
  default: '',
});
