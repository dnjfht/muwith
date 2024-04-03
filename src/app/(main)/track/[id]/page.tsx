import { fetchSpotifyArtistDetailData, fetchSpotifyTrackDetailData } from '@/app/api/spotify';
import DetailContent from '@/app/components/DetailContent';
import TypeEffect from '@/app/components/TypeEffect';
import { DEFAULT_PICTURE } from '@/app/constants';
import { timeString } from '@/app/layout-constants';
import { MuwithObjectType } from '@/app/types/api-responses/global';
import Image from 'next/image';

export default async function TrackDetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const track = await fetchSpotifyTrackDetailData(id);
  const representativeArtist =
    track.artists.length > 0 ? await fetchSpotifyArtistDetailData(track.artists[0].id) : null;

  if (!track) {
    return <p>No Data...</p>;
  }

  const thumbnailImg = track.album.thumbnailUrl ?? DEFAULT_PICTURE;
  const artistNames = track.artists.map((artist: { name: string }) => artist.name);
  const artistsName = artistNames.join(', ');
  const artistProfileName = artistsName ?? '아티스트';
  const artistProfileImg = representativeArtist?.thumbnailUrl ?? DEFAULT_PICTURE;

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
          <p>곡</p>

          <TypeEffect type="track" data={track} />

          <div className="w-full mt-3 flex items-center gap-x-2">
            <Image
              className="w-6 aspect-square rounded-full shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]"
              width={200}
              height={200}
              src={artistProfileImg}
              alt="profile_img"
            />
            <p>{artistProfileName}</p>

            <p>·</p>
            <p>{track.album.name}</p>
            <p>·</p>
            <p>{track.album.releaseDate.slice(0, 4)}</p>
            <p>·</p>
            <p>{timeString(track.duration)}</p>
          </div>
        </div>
      </div>

      <DetailContent type={MuwithObjectType.TRACK} data={track} />
    </div>
  );
}
