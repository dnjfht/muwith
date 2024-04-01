export interface ArtistEssential {
  id: string; // 가수 ID
  name: string; // 가수명
}

export interface Artist extends ArtistEssential {
  thumbnailUrl?: string; // 가수 이미지 URL
  followers: number; // 구독자수
  popularity: number; // 가수의 인기도 (0 ~ 100)
  albums: {
    // 앨범 목록
    id: string; // 앨범 ID
    name: string; // 앨범명
    albumType: 'album' | 'single' | 'compilation';
    totalTracks: number; // 앨범 수록곡 개수
    thumbnailUrl?: string; // 앨범 이미지 URL
    releaseDate: string; // 앨범 발매일 (형식: YYYY or YYYY-MM or YYYY-MM-DD, 예: 2024-01)
  }[];
  genres: { name: string }[]; // 본 가수의 음악 장르 목록
}
