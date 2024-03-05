import { fetchSpotifyAnyObjectDetailData } from '@/app/api/spotify';
import DetailContent from '@/app/components/DetailContent';
import TypeEffect from '@/app/components/TypeEffect';
import { DEFAULT_PICTURE } from '@/app/constants';
import { numberWithCommas, timeString, timeString2 } from '@/app/layout-constants';
import { Album } from '@/app/types/api-responses/album';
import { Artist } from '@/app/types/api-responses/artist';
import { MuwithObject, MuwithObjectType } from '@/app/types/api-responses/global';
import { Playlist } from '@/app/types/api-responses/playlist';
import { Track } from '@/app/types/api-responses/track';
import Image from 'next/image';

export default async function DetailPage({ params }: { params: { id: string; type: MuwithObjectType } }) {
  const id = params.id;
  const type = params.type;
  const data = await fetchSpotifyAnyObjectDetailData(type, id);

  const typeTxt = ((type: MuwithObjectType) => {
    if (type === MuwithObjectType.PLAYLIST) return '플레이리스트';
    if (type === MuwithObjectType.ALBUM) {
      if ([MuwithObjectType.ALBUM, 'compilation'].includes((data as Album).albumType)) return '앨범';
      if ((data as Album).albumType === 'single') return '싱글';
    }
    if (type === MuwithObjectType.ARTIST) return '아티스트';
    if (type === MuwithObjectType.TRACK) return '곡';
    return '';
  })(type);

  const thumbnailImg =
    (type === MuwithObjectType.TRACK ? (data as Track).album.thumbnailUrl : data.thumbnailUrl) ?? DEFAULT_PICTURE;

  const profileImg = ((type: MuwithObjectType, data: MuwithObject) => {
    if (type === MuwithObjectType.PLAYLIST) {
      return (data as Playlist).owner.profileImage;
    }
    return DEFAULT_PICTURE;
  })(type, data);

  const artistNames =
    type === MuwithObjectType.ALBUM || type === MuwithObjectType.TRACK
      ? (data as Track).artists.map((artist: { name: string }) => artist.name)
      : [];
  const artistsName = artistNames.join(', ');
  const artistId = type === MuwithObjectType.ALBUM ? (data as Album).artists[0]?.id : undefined;

  const profileName = type === MuwithObjectType.PLAYLIST ? (data as Playlist).owner.name : artistsName ?? '아티스트';

  const totalTimes =
    type === MuwithObjectType.ALBUM || type === MuwithObjectType.PLAYLIST
      ? (data as Album).tracks.map((track: { duration: number }) => track.duration)
      : [];

  const totalTime = totalTimes.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

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

              {type === MuwithObjectType.PLAYLIST ? (
                <p className="mt-3 text-[#a1a1a1]">{(data as Playlist).description}</p>
              ) : null}

              <div className="w-full mt-3">
                <div className="flex items-center gap-x-2">
                  {type !== MuwithObjectType.ARTIST && (
                    <>
                      <Image
                        className="w-6 aspect-square rounded-full shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]"
                        width={200}
                        height={200}
                        src={profileImg}
                        alt="profile_img"
                      />
                      <p>{profileName}</p>

                      {type === MuwithObjectType.PLAYLIST || type === MuwithObjectType.TRACK ? (
                        <>
                          <p>·</p>
                          <p>
                            {type === MuwithObjectType.PLAYLIST
                              ? '좋아요 ' + numberWithCommas((data as Playlist).followers) + '개'
                              : (data as Track).album.name}
                          </p>
                        </>
                      ) : null}

                      {type === MuwithObjectType.ALBUM || type === MuwithObjectType.TRACK ? (
                        <>
                          <p>·</p>
                          <p>
                            {type === MuwithObjectType.TRACK
                              ? (data as Track).album.releaseDate.slice(0, 4)
                              : (data as Album).releaseDate.slice(0, 4)}
                          </p>
                        </>
                      ) : null}

                      {type === MuwithObjectType.PLAYLIST || type === MuwithObjectType.ALBUM ? (
                        <>
                          <p>·</p>
                          <p>
                            {type === MuwithObjectType.ALBUM
                              ? (data as Album).totalTracks
                              : (data as Playlist).tracks.length}
                            곡
                          </p>
                        </>
                      ) : null}

                      {type === MuwithObjectType.TRACK ? (
                        <>
                          <p>·</p>
                          <p>{timeString((data as Track).duration)}</p>
                        </>
                      ) : null}

                      {type === MuwithObjectType.ALBUM || type === MuwithObjectType.PLAYLIST ? (
                        <>
                          <p>·</p>
                          <p>{timeString2(totalTime)}</p>
                        </>
                      ) : null}
                    </>
                  )}
                  {type === MuwithObjectType.ARTIST && (
                    <div className="mt-4 flex items-center gap-x-4">
                      <button className="px-5 py-2 box-border border-[2px] border-solid border-white rounded-3xl shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]">
                        팔로우하기
                      </button>

                      <p>월간 리스너 {numberWithCommas((data as Artist).followers as number)}명</p>
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
