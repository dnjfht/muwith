export interface ListData {
  id: string;
  name: string;
  thumbnailUrl: string;
  totalTracks?: number;
  releaseDate?: string;
  description?: string;
}

export interface ArtistType {
  id: string;
  name: string;
}

export interface TrackType {
  id: string;
  name: string;
  artists: ArtistType[];
  album: {
    name: string;
    thumbnailUrl: string;
  };
  duration: number;
  youtubeUrl: string;
}
