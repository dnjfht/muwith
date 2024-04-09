import { fetchSpotifyPlaylistDetailData } from '@/app/api/spotify';
import PlaylistDetailContent from '@/app/components/playlist/PlaylistDetailContent';
import TypeEffect from '@/app/components/typeEffect/TypeEffect';
import { DEFAULT_PICTURE } from '@/app/constants';
import { numberWithCommas, timeString2 } from '@/app/layout-constants';
import Image from 'next/image';

export default async function DetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const playlist = await fetchSpotifyPlaylistDetailData(id);

  if (!playlist) {
    return <p>No Data...</p>;
  }

  const thumbnailImg = playlist.thumbnailUrl ?? DEFAULT_PICTURE;
  const profileImg = playlist.owner.profileImage;
  const profileName = playlist.owner.name;

  const totalTimes = playlist.tracks.map((track: { duration: number }) => track.duration);
  const totalTime = totalTimes.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

  return (
    <div>
      <div className="w-full px-6 py-8 box-border bg-[#232426] flex items-end gap-x-8">
        <Image
          className="w-[232px] aspect-square rounded-md shadow-[15px_15px_20px_-15px_rgba(0,0,0,0.7)]"
          width={400}
          height={400}
          src={thumbnailImg}
          alt="playlist_thumbnail"
        />

        <div className="w-full text-[0.875rem] text-white">
          <p>플레이리스트</p>

          <TypeEffect backgroundStyle="bg-gradient-to-r from-cyan-500 to-blue-500" data={playlist} />

          <p className="mt-3 text-[#a1a1a1]">{playlist.description}</p>

          <div className="w-full mt-3 flex items-center gap-x-2">
            <Image
              className="w-6 aspect-square rounded-full shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]"
              width={200}
              height={200}
              src={profileImg}
              alt="profile_img"
            />
            <p>{profileName}</p>

            <p>·</p>
            <p>{'좋아요 ' + numberWithCommas(playlist.followers) + '개'}</p>
            <p>·</p>
            <p>{playlist.tracks.length}곡</p>
            <p>·</p>
            <p>{timeString2(totalTime)}</p>
          </div>
        </div>
      </div>

      <PlaylistDetailContent data={playlist} />
    </div>
  );
}
