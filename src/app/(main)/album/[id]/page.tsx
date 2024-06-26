import { fetchSpotifyAlbumDetailData, fetchSpotifyArtistDetailData } from '@/app/api/spotify';
import AlbumDetailContent from '@/app/components/album/AlbumDetailContent';
import TypeEffect from '@/app/components/typeEffect/TypeEffect';
import { DEFAULT_PICTURE } from '@/app/constants';
import { timeString2 } from '@/app/layout-constants';
import Image from 'next/image';

export default async function AlbumDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const album = await fetchSpotifyAlbumDetailData(id);

  if (!album) {
    return <p>No Data...</p>;
  }

  const typeTxt = album.albumType === 'single' ? '싱글' : '앨범';

  const thumbnailImg = album.thumbnailUrl ?? DEFAULT_PICTURE;
  // TODO: SPOTIFY랑 연동해서 다른 사람들의 프로필 정보를 가져올 수 있을 것인가?
  const profileImg = DEFAULT_PICTURE;
  const artistsName = album.artists.map((artist: { name: string }) => artist.name).join(', ');
  const profileName = artistsName ?? '아티스트';

  const totalTimes = album.tracks.map((track: { duration: number }) => track.duration);
  const totalTime = totalTimes.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

  const albumArtist = album.artists.length ? await fetchSpotifyArtistDetailData(album.artists[0].id) : null;

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
          <p>{typeTxt}</p>

          <TypeEffect backgroundStyle="bg-gradient-to-r from-cyan-500 to-[#6cb16b]" data={album} />

          <div className="w-full mt-3">
            <div className="flex items-center gap-x-2">
              <Image
                className="w-6 aspect-square rounded-full shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]"
                width={200}
                height={200}
                src={profileImg}
                alt="profile_img"
              />
              <p>{profileName}</p>

              <p>·</p>
              <p>{album.releaseDate.slice(0, 4)}</p>
              <p>·</p>
              <p>{album.totalTracks}곡</p>
              <p>·</p>
              <p>{timeString2(totalTime)}</p>
            </div>
          </div>
        </div>
      </div>

      <AlbumDetailContent data={album} albumArtist={albumArtist} />
    </div>
  );
}
