import TableListTop from '../search/tab/TableListTops';
import TrackGroup2 from '../trackGroup/TrackGroup2';
import DetailContentTop from '../detail/DetailContentTop';
import { Playlist } from '../../types/api-responses/playlist';

interface DetailContentType {
  data: Playlist;
}

export default async function PlaylistDetailContent({ data }: DetailContentType) {
  const tracks = data.tracks;
  const trackIdArr = tracks.map((data) => data.id);
  const currentPlaylistTitle = data.name;

  return (
    <div className="w-full min-h-[44vh] p-6 box-border bg-gradient-to-b from-[#2c2d2e] to-[#a1d2de]">
      <DetailContentTop trackIds={trackIdArr} currentPlaylistTitle={currentPlaylistTitle} />

      <div className="w-full mb-6">
        <TableListTop isPlaylist={true} />

        {tracks.map((track, idx: number) => (
          <TrackGroup2
            key={track.id}
            idx={idx}
            data={track}
            isGroupTrack={true}
            isHiddenIcon="hidden"
            wrapStyle="text-white py-4"
            idxWidthStyle="block w-[4%]"
            imgWidthStyle="w-[30%]"
            albumTitleWidthStyle="w-[30%] block"
            trackIdArr={trackIdArr}
            currentPlaylistTitle={currentPlaylistTitle}
          />
        ))}
      </div>
    </div>
  );
}
