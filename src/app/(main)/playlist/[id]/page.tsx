'use client';

import { fetchPlaylist } from '@/app/api/playlist_api';
import { AppPage, MusicData } from '@/app/types';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReactTyped } from 'react-typed';

interface Playlist {
  id: string;
  type: string;
  thumbnail: string;
  title: string;
  description?: string;
  author: string;
  authorProfileImg: string;
  likes?: number;
  isLikeTracks?: boolean;
  songs: MusicData[];
}

export default function Playlist() {
  const pathname = usePathname();
  const id = pathname.split('/')[2];
  // const id = searchParams.id;

  const [data, setData] = useState<Playlist | null>(null);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      setData(await fetchPlaylist(id));
    };

    fetchPlaylistData();
  }, [id]);

  const bgColor = pathname.includes(AppPage.PLAYLIST) ? 'bg-[#232426]' : 'bg-transparent';
  const textBgColor = pathname.includes(AppPage.PLAYLIST)
    ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
    : 'bg-gradient-to-r from-cyan-500 to-[#6cb16b]';

  return (
    <div className="py-8">
      {data && (
        <div className={`w-full px-6 py-8 box-border ${bgColor} flex items-end gap-x-8`}>
          <Image
            className="w-[232px] aspect-square rounded-md shadow-[15px_15px_20px_-15px_rgba(0,0,0,0.7)]"
            width={400}
            height={400}
            src={data.thumbnail}
            alt="playlist_thumbnail"
          />

          <div className="w-full text-[0.875rem] text-white">
            <p>플레이리스트</p>

            <h1
              className={`${textBgColor} mt-5 text-[4.375rem] text-[#232426] font-bold whitespace-pre-wrap line-clamp-1`}
            >
              <ReactTyped
                strings={[data.title]}
                typeSpeed={50} //타이핑 속도
                backSpeed={25} //타이핑 지우는 속도
                loop={true} //반복할건지
                startDelay={500}
                backDelay={1000}
              />
            </h1>

            <p className="mt-3 text-[#a1a1a1]">{data.description}</p>

            <div className="w-full mt-3">
              <div className="flex items-center gap-x-2">
                <Image
                  className="w-6 aspect-square rounded-full"
                  width={200}
                  height={200}
                  src={data.authorProfileImg}
                  alt="profile_img"
                />
                <p>{data.author}</p>
                <p>·</p>
                {data.likes && <p className="font-normal">좋아요 {data.likes}개</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
