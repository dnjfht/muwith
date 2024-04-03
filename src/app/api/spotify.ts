// Spotify 검색 기능

import { Album } from '../types/api-responses/album';
import { Artist } from '../types/api-responses/artist';
import { Playlist } from '../types/api-responses/playlist';
import { PlaylistSet } from '../types/api-responses/playlist-set';
import { SearchResponse } from '../types/api-responses/search';
import { Track } from '../types/api-responses/track';

const getRequest = async <T>(url: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL2}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });
  const result: T = await res.json();
  return result;
};

export const fetchSpotifySearchData = async (searchString: string) => {
  return await getRequest<SearchResponse>(
    `/search?keyword=${encodeURIComponent(searchString)}&types=artist,album,track,playlist&limit=50`,
  );
};

export const fetchSpotifyPlalylistSetsData = async () => {
  return await getRequest<PlaylistSet[]>('/playlist-set');
};

export const fetchSpotifyArtistDetailData = async (id: string) => {
  return await getRequest<Artist>(`/artist/${id}`);
};

export const fetchSpotifyAlbumDetailData = async (id: string) => {
  return await getRequest<Album>(`/album/${id}`);
};

export const fetchSpotifyTrackDetailData = async (id: string) => {
  return await getRequest<Track>(`/track/${id}`);
};

export const fetchSpotifyPlaylistDetailData = async (id: string) => {
  return await getRequest<Playlist>(`/playlist/${id}`);
};

export const fetchSpotifyArtistTopTracksData = async (id: string) => {
  return await getRequest<Omit<Track, 'youtubeUrl'>[]>(`/artist/${id}/top-tracks`);
};

export const fetchSpotifyRecommendedTracksData = async (id: string, num: number = 10) => {
  return await getRequest<Omit<Track, 'youtubeUrl'>[]>(`/track/recommendations-by-tracks?trackIds=${id}&limit=${num}`);
};
