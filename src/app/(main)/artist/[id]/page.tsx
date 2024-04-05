import { fetchSpotifyArtistDetailData } from '@/app/api/spotify';
import ArtistDetailContent from '@/app/components/artist/ArtistDetailContent';
import TypeEffect from '@/app/components/TypeEffect';
import { DEFAULT_PICTURE } from '@/app/constants';
import { numberWithCommas } from '@/app/layout-constants';
import Image from 'next/image';

export default async function DetailPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const artist = await fetchSpotifyArtistDetailData(id);

  if (!artist) {
    return <p>No Data...</p>;
  }

  const thumbnailImg = artist.thumbnailUrl ?? DEFAULT_PICTURE;

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
          <p>아티스트</p>

          <TypeEffect backgroundStyle="bg-gradient-to-r from-[#ffa72d] to-[#a3d4b3]" data={artist} />

          <div className="w-full mt-3 flex items-center gap-x-2">
            <div className="mt-4 flex items-center gap-x-4">
              <button className="px-5 py-2 box-border border-[2px] border-solid border-white rounded-3xl shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]">
                팔로우하기
              </button>

              <p>월간 리스너 {numberWithCommas(artist.followers)}명</p>
            </div>
          </div>
        </div>
      </div>

      <ArtistDetailContent artist={artist} />
    </div>
  );
}
