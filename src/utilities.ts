import { Album } from './app/types/api-responses/album';
import { MuwithObject, MuwithObjectType } from './app/types/api-responses/global';
import { Playlist } from './app/types/api-responses/playlist';

export const getDescription = (type: MuwithObjectType, object: MuwithObject) => {
  if (type === MuwithObjectType.ARTIST) {
    return '아티스트';
  }
  if (type === MuwithObjectType.ALBUM) {
    const albumObject = object as Album;
    return `${albumObject.totalTracks}곡 · ${albumObject.releaseDate.slice(0, 4)}`;
  }
  if (type === MuwithObjectType.PLAYLIST) {
    const playlistObject = object as Playlist;
    return playlistObject.description;
  }
  return '';
};
