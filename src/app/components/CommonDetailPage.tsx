'use client';

import { fetchPlaylistDetail } from '@/app/api/playlist_api';
import { AppPage, MusicData } from '@/app/types';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReactTyped } from 'react-typed';
import { fetchArtistDetail } from '../api/artist';

interface Data {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
  description?: string;
  author?: string;
  authorProfileImg?: string;
  artist_profile?: string;
  likes?: number;
  isLikeTracks?: boolean;
  songs?: MusicData[];
}

export default function CommonDetailPage() {
  const pathname = usePathname();
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];
  // const id = searchParams.id;

  const typeKr = type === 'playlist' ? '플레이리스트' : type === 'album' ? '앨범' : '아티스트';

  const [data, setData] = useState<Data | null>(null);

  useEffect(() => {
    if (type === 'playlist') {
      const fetchPlaylistDetailData = async () => {
        setData(await fetchPlaylistDetail(id));
      };
      fetchPlaylistDetailData();
    } else if (type === 'album') {
    } else {
      const fetchArtistDetailData = async () => {
        setData(await fetchArtistDetail(id));
      };

      fetchArtistDetailData();
    }
  }, [id, type]);

  const bgColor = type === 'playlist' ? 'bg-[#232426]' : type === 'album' ? 'bg-[#ff4e71]' : 'bg-[#ffa72d]';
  const textBgColor =
    type === 'playlist'
      ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
      : type === 'album'
        ? 'bg-gradient-to-r from-cyan-500 to-[#6cb16b]'
        : 'bg-gradient-to-r from-[#b3db71] to-[#a3d4b3]';

  console.log(data);

  return (
    <div className="py-8">
      {data && (
        <div className={`w-full px-6 py-8 box-border ${bgColor} flex items-end gap-x-8`}>
          <Image
            className="w-[232px] aspect-square rounded-md shadow-[15px_15px_20px_-15px_rgba(0,0,0,0.7)]"
            width={400}
            height={400}
            src={type !== 'artist' ? data.thumbnail : (data.artist_profile as string)}
            alt="playlist_thumbnail"
          />

          <div className="w-full text-[0.875rem] text-white">
            <p>{typeKr}</p>

            <h1 className={`${textBgColor} mt-5 text-[3rem] text-[#232426] font-bold whitespace-pre-wrap line-clamp-1`}>
              <ReactTyped
                strings={[data.title]}
                typeSpeed={50} //타이핑 속도
                backSpeed={25} //타이핑 지우는 속도
                loop={true} //반복할건지
                startDelay={500}
                backDelay={1000}
              />
            </h1>

            {data.type !== 'artist' && <p className="mt-3 text-[#a1a1a1]">{data.description}</p>}

            <div className="w-full mt-3">
              <div className="flex items-center gap-x-2">
                {data.authorProfileImg && (
                  <>
                    <Image
                      className="w-6 aspect-square rounded-full"
                      width={200}
                      height={200}
                      src={data.authorProfileImg}
                      alt="profile_img"
                    />
                    <p>{data.author}</p>
                    <p>·</p>
                    {data.author !== 'Spotify' && <p className="font-normal">좋아요 {data.likes}개</p>}
                  </>
                )}
                {type === 'artist' && (
                  <div className="flex items-center gap-x-4">
                    <button>팔로우하기</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
