import '../../(main)/layout.css';
import TableListTop from '../TableListTops';
import TrackGroup2 from '../trackGroup/TrackGroup2';
import RecommenedList from '../RecommenedList';
import DetailContentTop from '../DetailContentTop';
import { MuwithObjectType } from '../../types/api-responses/global';
import { Artist } from '../../types/api-responses/artist';
import { Album } from '@/app/types/api-responses/album';

interface DetailContentType {
  type: MuwithObjectType;
  data: Album;
  albumArtist: Artist;
}

export default async function AlbumDetailContent({ type, data, albumArtist }: DetailContentType) {
  const tracks = data.tracks;
  const trackIdArr = tracks.map((data) => data.id);

  return (
    <div className="w-full min-h-[44vh] p-6 box-border bg-gradient-to-b from-[#2c2d2e] to-[#a1d4a0]">
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
              imgWidthStyle="w-[90%]"
              albumTitleWidthStyle="hidden"
              trackIdArr={trackIdArr}
              isHiddenThumbnail="hidden"
              formatDateStyle="hidden"
            />
          );
        })}
      </div>

      <RecommenedList title="아티스트의 곡 더보기" datas={albumArtist!.albums} type={type} />
    </div>
  );
}
