import '../../(main)/layout.css';
import TableListTop from '../TableListTops';
import TrackGroup2 from '../trackGroup/TrackGroup2';
import DetailContentTop from '../DetailContentTop';
import { MuwithObjectType } from '../../types/api-responses/global';
import { Playlist } from '../../types/api-responses/playlist';
import { formatDate } from '@/app/layout-constants';

interface DetailContentType {
  type: MuwithObjectType;
  data: Playlist;
}

export default async function PlaylistDetailContent({ type, data }: DetailContentType) {
  const tracks = data.tracks;
  const trackIdArr = tracks.map((data) => data.id);

  return (
    <div className="w-full min-h-[44vh] p-6 box-border bg-gradient-to-b from-[#2c2d2e] to-[#a1d2de]">
      <DetailContentTop type={type} data={data} />

      <div className="w-full mb-6">
        <TableListTop type={type} />

        {tracks.map((track, idx: number) => {
          return (
            <TrackGroup2
              key={track.id}
              idx={idx}
              data={track}
              isGroupTrack={true}
              wrapStyle="text-white py-4"
              idxWidthStyle="block w-[4%]"
              imgWidthStyle="w-[30%]"
              albumTitleWidthStyle="w-[30%] block"
              trackIdArr={trackIdArr}
            />
          );
        })}
      </div>
    </div>
  );
}
