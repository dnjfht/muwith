import TableListTop from '../search/tab/TableListTops';
import TrackGroup2 from '../trackGroup/TrackGroup2';
import RecommenedList from '../recommendedList/RecommenedList';
import DetailContentTop from '../detail/DetailContentTop';
import { MuwithObjectType } from '../../types/api-responses/global';
import { Artist } from '../../types/api-responses/artist';
import { Album } from '@/app/types/api-responses/album';

interface DetailContentType {
  data: Album;
  albumArtist: Artist | null;
}

export default async function AlbumDetailContent({ data, albumArtist }: DetailContentType) {
  const type = MuwithObjectType.ALBUM;

  const tracks = data.tracks;
  const trackIdArr = tracks.map((data) => data.id);

  const currentPlaylistTitle = data.name;

  return (
    <div className="w-full min-h-[44vh] p-6 box-border bg-gradient-to-b from-[#2c2d2e] to-[#a1d4a0]">
      <DetailContentTop trackIds={trackIdArr} currentPlaylistTitle={currentPlaylistTitle} />

      <div className="w-full mb-6">
        <TableListTop isAlbum={true} />

        {tracks.map((track, idx: number) => {
          return (
            <TrackGroup2
              key={track.id}
              idx={idx}
              data={track}
              isGroupTrack={true}
              isHiddenIcon="hidden"
              wrapStyle="text-white py-4"
              idxWidthStyle="block w-[4%]"
              imgWidthStyle="w-[90%]"
              albumTitleWidthStyle="hidden"
              trackIdArr={trackIdArr}
              isHiddenThumbnail="hidden"
              formatDateStyle="hidden"
              currentPlaylistTitle={currentPlaylistTitle}
            />
          );
        })}
      </div>

      {albumArtist && (
        <RecommenedList
          type={type}
          title="아티스트의 곡 더보기"
          titleColorStyle="text-white"
          showAllColorStyle="text-[#c7c7c7]"
          isSlicedData={true}
          datas={albumArtist.albums}
        />
      )}
    </div>
  );
}
