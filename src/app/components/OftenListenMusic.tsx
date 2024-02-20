'use client';

import { useEffect, useState } from 'react';
import { fetchOftenListenData } from '../api/home_api';
import Image from 'next/image';
import Link from 'next/link';

interface OftenListenData {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  type: string;
}

export default function OftenListenMusic() {
  const [datas, setDatas] = useState<OftenListenData[]>([]);

  const loadOftenListenData = async () => {
    setDatas(await fetchOftenListenData());
  };

  useEffect(() => {
    loadOftenListenData();
  }, []);

  return (
    <div className="w-full mt-4 grid grid-cols-3 gap-4">
      {datas?.map((data) => {
        return (
          <Link
            href={{
              pathname: `/playlist/${data.id}`,
              // query: { id: data.id },
            }}
            key={data.id}
            className="w-full p-3 box-border bg-[rgb(35,36,38)] rounded-2xl border-[2px] border-solid border-[#232426] shadow-lg flex items-center gap-x-5 text-white cursor-pointer font-bold hover:bg-[rgba(35,36,38,0.1)] hover:text-[#232426] transition-all duration-700"
          >
            <Image
              className="w-16 h-16 rounded-xl"
              width={64}
              height={64}
              src={data.thumbnail}
              alt="playlist_thumbnail"
            />
            <p>{data.title}</p>
          </Link>
        );
      })}
    </div>
  );
}
