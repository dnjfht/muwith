import { Album } from './album';
import { Artist } from './artist';
import { Playlist } from './playlist';
import { PlaylistSet } from './playlist-set';
import { Track } from './track';

export enum MuwithObjectType {
  ARTIST = 'artist',
  ALBUM = 'album',
  TRACK = 'track',
  PLAYLIST = 'playlist',
  PLAYLIST_SET = 'playlist-set',
  ETC = 'etc',
}

export type MuwithObject = Artist | Album | Track | Playlist | PlaylistSet;
