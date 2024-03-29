import { TrackType } from '@/app/types';
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

export const CurrentTrackIndexState = atom({
  key: 'CurrentTrackIndexState',
  default: -1,
});

export const CurrentTrackDataState = atom<TrackType | null>({
  key: 'CurrentTrackDataState',
  default: null,
});
