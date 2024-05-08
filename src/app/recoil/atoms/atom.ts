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

// 현재 재생 중인 곡, 앞으로 재생될 곡 리스트
export const CurrentPlayListDataState = atom<string[]>({
  key: 'CurrentPlayListDataState',
  default: [],
});

// 현재 재생 중인 곡, 앞으로 재생될 곡 리스트 오리지널
export const OriginalCurrentPlayListDataState = atom<string[]>({
  key: 'OriginalCurrentPlayListDataState',
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

// 현재 재생 중인 곡, 앞으로 재생될 곡 리스트 반복 버튼 클릭 횟수
export const CurrentPlaylistRepeatClickNumState = atom<number>({
  key: 'CurrentPlaylistRepeatClickNumState',
  default: 0,
});

// FullScreenCurrentPlayDetail component를 닫힘 여부를 결정하는 boolean
export const OpenFullScreenCurrentPlayDetailState = atom<boolean>({
  key: 'OpenFullScreenCurrentPlayDetailState',
  default: false,
});

// 현재 재생 중인 곡, 앞으로 재생될 곡 랜덤 재생 모드가 실행 중인지, 아닌지
export const CurrentPlaylistRandomModeState = atom<boolean>({
  key: 'CurrentPlaylistRandomModeState',
  default: false,
});

// 현재 재생 중인 곡, 앞으로 재생될 곡 랜덤 재생 모드를 실행시켜야 하는지, 아닌지
export const TryCurrentPlaylistRandomModeState = atom<boolean>({
  key: 'TryCurrentPlaylistRandomModeState',
  default: false,
});
