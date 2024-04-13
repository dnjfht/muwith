export interface TrackInPlaylist {
  id: string; // 곡 ID
  name: string; // 곡명
  explicit: boolean; // 성인제한
  discNumber: number; // 디스크 번호
  trackNumber: number; // 트랙 번호
  duration: number; // 곡의 재생 시간 (Millisecond)
  album: {
    // 앨범 정보
    id: string; // 앨범 ID
    name: string; // 앨범명
    albumType: 'album' | 'single' | 'compilation';
    totalTracks: number; // 앨범 수록곡 개수
    thumbnailUrl?: string; // 앨범 이미지 URL
    releaseDate: string; // 앨범 발매일 (형식: YYYY or YYYY-MM or YYYY-MM-DD, 예: 2024-01)
  };
  artists: {
    // 곡에 참여한 가수 목록
    id: string; // 가수 ID
    name: string; // 가수명
  }[];
  addedAt?: string; // 본 곡이 플레이리스트에 추가된 시각 (ISO 8601 형식)
}

export interface Playlist {
  id: string; // 플레이리스트 ID
  name: string; // 플레이리스트명
  description: string; // 플레이리스트 설명
  followers?: number; // 구독자수
  thumbnailUrl?: string; // 플레이리스트 이미지 URL
  owner: {
    // 플레이리스트를 만든 유저
    loginId: string; // 로그인에 이용되는 고유 ID (이 값으로 유저 정보를 조회할 수 있습니다.)
    name: string; // 유저의 닉네임
    profileImage: string; // 프로필 이미지의 URL
  };
  tracks: TrackInPlaylist[]; // 플레이리스트 수록곡 목록
}
