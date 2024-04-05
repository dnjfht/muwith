import TrackGroup2 from '../trackGroup/TrackGroup2';
import { fetchSpotifyArtistTopTracksData } from '../../api/spotify';
import { numberWithCommas } from '../../layout-constants';
import DetailContentTop from '../DetailContentTop';
import { MuwithObjectType } from '../../types/api-responses/global';
import { Artist } from '../../types/api-responses/artist';

interface ArtistDetailContentProps {
  artist: Artist;
}

export default async function ArtistDetailContent({ artist }: ArtistDetailContentProps) {
  const artistTopTracksData = await fetchSpotifyArtistTopTracksData(artist.id);
  const trackIdArr = artistTopTracksData.map((data) => data.id);

  return (
    <div className="w-full min-h-[44vh] p-6 box-border bg-gradient-to-b from-[#2c2d2e] to-[#ffb685]">
      <DetailContentTop type={MuwithObjectType.ARTIST} data={artist} artistTopTracksData={artistTopTracksData} />

      <div
        className="w-full h-[32.5rem] p-10 box-border rounded-xl relative overflow-hidden shadow-[0_8px_6px_3px_rgba(0,0,0,0.3)] hover-bg-size group"
        style={{
          backgroundImage: `url(${artist.thumbnailUrl})`,
          transition: 'all 0.5s',
          transitionDuration: '750',
        }}
      >
        <div className="absolute bottom-[10%] left-[3%] z-[2] text-white">
          <h1 className="mb-3 text-[2.7rem]">{artist.name}</h1>
          <p className="mb-[1px] text-[1.2rem]">월간 리스너 {numberWithCommas(artist.followers)}명</p>
          <p>장르 : {artist.genres[0]?.name ?? 'music'}</p>
        </div>

        <div className="w-full h-full bg-[rgba(0,0,0,0.4)] group-hover:bg-[rgba(0,0,0,0.6)] absolute top-0 left-0 transition-all duration-700 z-[1]" />
      </div>

      <div className="w-full">
        <h1 className="mb-2 text-[1.5rem] font-semibold text-white">인기</h1>

        {artistTopTracksData.map((topTrack, idx: number) => {
          return (
            <TrackGroup2
              key={topTrack.id}
              idx={idx}
              data={topTrack}
              isGroupTrack={true}
              wrapStyle="text-white py-4"
              imgWidthStyle="w-full"
              albumTitleWidthStyle="hidden"
              formatDateStyle="hidden"
              trackIdArr={trackIdArr}
            />
          );
        })}
      </div>
    </div>
  );
}
