export interface Album {
  id: string; // 앨범 ID
  name: string; // 앨범명
  albumType: 'album' | 'single' | 'compilation';
  totalTracks: number; // 수록곡 개수
  thumbnailUrl?: string; // 앨범 이미지 URL
  releaseDate: string; // 앨범 발매일 (형식: YYYY or YYYY-MM or YYYY-MM-DD, 예: 2024-01)
  copyright?: string; // 앨범 저작권자
  recordingCopyright?: string; // 앨범 녹음 저작권자
  label: string; // 앨범 발매사
  popularity: number; // 앨범의 인기도 (0 ~ 100)
  tracks: {
    // 수록곡 목록
    id: string; // 곡 ID
    name: string; // 곡명
    explicit: boolean; // 성인제한
    discNumber: number; // 디스크 번호
    trackNumber: number; // 트랙 번호
    duration: number; // 곡의 재생 시간 (Millisecond)
    artists: {
      // 곡에 참여한 가수 목록
      id: string; // 가수 ID
      name: string; // 가수명
    }[];
  }[];
  artists: {
    // 앨범에 참여한 가수 목록
    id: string; // 가수 ID
    name: string; // 가수명
  }[];
}
