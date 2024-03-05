export interface Track {
  id: string; // 곡 ID
  name: string; // 곡명
  thumbnailUrl: undefined;
  explicit: boolean; // 성인제한
  discNumber: number; // 디스크 번호
  trackNumber: number; // 트랙 번호
  duration: number; // 곡의 재생 시간 (Millisecond)
  popularity: number; // 곡의 인기도 (0 ~ 100)
  youtubeUrl: string; // 유튜브 동영상 URL
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
}
