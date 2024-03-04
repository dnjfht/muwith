import '../(main)/layout.css';
import TableListTop from './TableListTops';
import TrackGroup2 from './TrackGroup2';
import RecommenedList from './RecommenedList';
import { fetchSpotifyAlbumDetailData, fetchSpotifyArtistTopTracksData } from '../api/spotify';
import TrackLylics from './TrackLylics';
import { numberWithCommas } from '../layout-constants';
import DetailContentTop from './DetailContentTop';

interface DetailContentType {
  type: string;
  artistId: string;
}

export default async function DetailContent({ type, data, artistId }: DetailContentType) {
  const bgColor =
    type === 'track'
      ? 'bg-gradient-to-b from-[#2c2d2e] to-[#ffc9dc]'
      : type === 'album'
        ? 'bg-gradient-to-b from-[#2c2d2e] to-[#a1d4a0]'
        : type === 'playlist'
          ? 'bg-gradient-to-b from-[#2c2d2e] to-[#a1d2de]'
          : 'bg-gradient-to-b from-[#2c2d2e] to-[#ffb685]';

  const trackData = data?.tracks;
  const artistData = await fetchSpotifyAlbumDetailData('artist', artistId);
  const artistTopTracksData = await fetchSpotifyArtistTopTracksData(data.id);

  return (
    <div className={`${bgColor} w-full min-h-[44vh] p-6 box-border`}>
      <DetailContentTop type={type} data={data} artistTopTracksData={artistTopTracksData} />

      {type === 'track' && (
        <>
          <div>
            <h1 className="mb-2 text-[1.5rem] font-semibold text-white">가사</h1>
            <TrackLylics />
          </div>

          <div className={`${data?.artists?.length === 1 && 'flex gap-x-4'} w-full`}>
            <RecommenedList title="아티스트" datas={data?.artists} type="artist" />

            <div className={`${data?.artists?.length === 1 ? 'w-calc_3' : 'w-full'} py-6`}>될까?</div>
          </div>
        </>
      )}

      {(type === 'playlist' || type === 'album') && (
        <div className="w-full mb-6">
          <TableListTop type={type} />

          {trackData?.map((track, idx: number) => {
            return <TrackGroup2 key={track.id} data={track} idx={idx} type={type} datas={trackData} />;
          })}
        </div>
      )}

      {type === 'album' && <RecommenedList title="아티스트의 곡 더보기" datas={artistData?.albums} type={type} />}

      {type === 'artist' && (
        <>
          <div
            className="w-full h-[32.5rem] p-10 box-border rounded-xl relative overflow-hidden shadow-[0_8px_6px_3px_rgba(0,0,0,0.3)] hover-bg-size group"
            style={{
              backgroundImage: `url(${data?.thumbnailUrl})`,
              transition: 'all 0.5s',
              transitionDuration: '750',
            }}
          >
            <div className="absolute bottom-[10%] left-[3%] z-[2] text-white">
              <h1 className="mb-3 text-[2.7rem]">{data?.name}</h1>
              <p className="mb-[1px] text-[1.2rem]">월간 리스너 {numberWithCommas(data?.followers)}명</p>
              <p>장르 : {data?.genres[0]?.name ? data?.genres[0]?.name : 'music'}</p>
            </div>

            <div className="w-full h-full bg-[rgba(0,0,0,0.4)] group-hover:bg-[rgba(0,0,0,0.6)] absolute top-0 left-0 transition-all duration-700 z-[1]" />
          </div>

          <div className="w-full">
            <h1 className="mb-2 text-[1.5rem] font-semibold text-white">인기</h1>

            {artistTopTracksData?.map((topTrack, idx: number) => {
              return (
                <TrackGroup2 key={topTrack.id} data={topTrack} idx={idx} type={type} datas={artistTopTracksData} />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
