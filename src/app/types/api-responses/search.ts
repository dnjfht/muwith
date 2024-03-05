export interface TrackInSearch {
  id: string; // 곡 ID
  name: string; // 곡명
  explicit: boolean; // 성인제한
  discNumber: number; // 디스크 번호
  trackNumber: number; // 트랙 번호
  duration: number; // 곡의 재생 시간 (Millisecond)
  popularity: number; // 곡의 인기도 (0 ~ 100)
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
  addedAt: undefined;
}

export interface AlbumInSearch {
  id: string; // 앨범 ID
  name: string; // 앨범명
  albumType: 'album' | 'single' | 'compilation';
  totalTracks: number; // 수록곡 개수
  thumbnailUrl?: string; // 앨범 이미지 URL
  releaseDate: string; // 앨범 발매일 (형식: YYYY or YYYY-MM or YYYY-MM-DD, 예: 2024-01)
}

export interface ArtistInSearch {
  id: string; // 가수 ID
  name: string; // 가수명
  thumbnailUrl?: string; // 가수 이미지 URL
  followers: number; // 구독자수
  popularity: number; // 가수의 인기도 (0 ~ 100)
  genres: { name: string }[]; // 본 가수의 음악 장르 목록
}

export interface PlaylistInSearch {
  id: string; // 플레이리스트 ID
  name: string; // 플레이리스트명
  description: string; // 플레이리스트 설명
  thumbnailUrl?: string; // 플레이리스트 이미지 URL
}

export interface SearchResponse {
  tracks: {
    // 검색된 곡 정보
    items: TrackInSearch[]; // 현재 페이지 검색된 곡 목록
    totalPage: number; // 검색된 곡 전체 페이지 수
  };
  albums: {
    // 검색된 앨범 정보
    items: AlbumInSearch[]; // 현재 페이지 검색된 앨범 목록
    totalPage: number; // 검색된 앨범 전체 페이지 수
  };
  artists: {
    // 검색된 가수 정보
    items: ArtistInSearch[]; // 현재 페이지 검색된 가수 목록
    totalPage: number; // 검색된 가수 전체 페이지 수
  };
  playlists: {
    // 검색된 플레이리스트 정보
    items: PlaylistInSearch[]; // 현재 페이지 검색된 플레이리스트 목록
    totalPage: number; // 검색된 플레이리스트 전체 페이지 수
  };
}
