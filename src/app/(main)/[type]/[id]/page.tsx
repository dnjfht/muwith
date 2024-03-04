import { fetchSpotifyAlbumDetailData } from '@/app/api/spotify';
import DetailContent from '@/app/components/DetailContent';
import TypeEffect from '@/app/components/TypeEffect';
import { numberWithCommas, timeString, timeString2 } from '@/app/layout-constants';
import Image from 'next/image';

export default async function DetailPage({ params }: { params: { id: string; type: string } }) {
  const id = params.id;
  const type = params.type;
  const data = await fetchSpotifyAlbumDetailData(type, id);

  const typeTxt =
    type === 'playlist'
      ? '플레이리스트'
      : type === 'album' && data?.albumType === 'album'
        ? '앨범'
        : type === 'album' && data?.albumType === 'single'
          ? '싱글'
          : type === 'artist'
            ? '아티스트'
            : '곡';

  const thumbnailImg =
    type === 'playlist' || type === 'album' || type === 'artist' ? data?.thumbnailUrl : data?.album?.thumbnailUrl;

  const profileImg =
    type === 'playlist' && data?.owner?.profileImage
      ? data?.owner?.profileImage
      : (type === 'album' || type === 'track') && data?.artists?.length > 1
        ? '/image/default_profile_img.png'
        : (type === 'album' || type === 'track') && data?.artists?.length <= 1 && data?.artists[0]?.thumbnailUrl
          ? data?.artists[0]?.thumbnailUrl
          : '/image/default_profile_img.png';

  const artistsArr =
    (type === 'album' || type === 'track') && data?.artists?.map((artist: { name: string }) => artist.name);
  const artistsName = artistsArr && artistsArr.join(', ');
  const artistId = type === 'album' && data?.artists[0]?.id;

  const profileName =
    type === 'playlist' && data?.owner?.name
      ? data?.owner?.name
      : (type === 'album' || type === 'track') && artistsName
        ? artistsName
        : '아티스트';

  const totalTimeArr =
    (type === 'album' || type === 'playlist') && data.tracks?.map((track: { duration: number }) => track.duration);

  const totalTime =
    totalTimeArr && totalTimeArr.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

  return (
    <div>
      {data ? (
        <>
          <div className="w-full px-6 py-8 box-border bg-[#232426] flex items-end gap-x-8">
            <Image
              className="w-[232px] aspect-square rounded-md shadow-[15px_15px_20px_-15px_rgba(0,0,0,0.7)]"
              width={400}
              height={400}
              src={thumbnailImg}
              alt="playlist_thumbnail"
            />

            <div className="w-full text-[0.875rem] text-white">
              <p>{typeTxt}</p>

              <TypeEffect type={type} data={data} />

              <p className={`${type === 'playlist' ? 'block' : 'hidden'} mt-3 text-[#a1a1a1]`}>{data?.description}</p>

              <div className="w-full mt-3">
                <div className="flex items-center gap-x-2">
                  {type !== 'artist' && (
                    <>
                      <Image
                        className="w-6 aspect-square rounded-full shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]"
                        width={200}
                        height={200}
                        src={profileImg}
                        alt="profile_img"
                      />
                      <p>{profileName}</p>
                      <p>·</p>
                      <p className={`${type === 'playlist' || type === 'track' ? 'block' : 'hidden'}`}>
                        {type === 'playlist' ? '좋아요 ' + numberWithCommas(data?.followers) + '개' : data?.album?.name}
                      </p>
                      <p className={`${type === 'album' && 'hidden'}`}>·</p>
                      <p className={`${type === 'album' || type === 'track' ? 'block' : 'hidden'}`}>
                        {type === 'track' ? data?.album?.releaseDate?.slice(0, 4) : data?.releaseDate?.slice(0, 4)}
                      </p>
                      <p className={`${type === 'playlist' && 'hidden'}`}>·</p>
                      <p
                        className={`${type === 'playlist' || type === 'album' ? 'block' : 'hidden'}`}
                      >{`${type === 'album' ? data?.totalTracks : data?.tracks?.length}곡`}</p>
                      <p className={`${type === 'track' && 'hidden'}`}>·</p>
                      <p className={`${type === 'track' ? 'block' : 'hidden'}`}>{timeString(data?.duration)}</p>
                      <p className={`${type !== 'track' && 'hidden'}`}>·</p>
                      <p className={`${type === 'album' || type === 'playlist' ? 'block' : 'hidden'}`}>
                        {timeString2(totalTime)}
                      </p>
                      <p className={`${type === 'track' ? 'block' : 'hidden'}`}>
                        {data.totalPlayNum ? numberWithCommas(data.totalPlayNum) : numberWithCommas(154000)}
                      </p>
                    </>
                  )}
                  {type === 'artist' && (
                    <div className="mt-4 flex items-center gap-x-4">
                      <button className="px-5 py-2 box-border border-[2px] border-solid border-white rounded-3xl shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]">
                        팔로우하기
                      </button>

                      <p>월간 리스너 {numberWithCommas(data.followers as number)}명</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DetailContent type={type} data={data} artistId={artistId} />
        </>
      ) : (
        <p>No Data...</p>
      )}
    </div>
  );
}
