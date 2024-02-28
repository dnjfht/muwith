'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { PageWidthState } from '../recoil/atoms/atom';

interface OftenListenMusicProps {
  datas: OftenListenData[];
}

interface OftenListenData {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  type: string;
}

export default function OftenListenMusic({ datas }: OftenListenMusicProps) {
  const pageWidth = useRecoilValue(PageWidthState);
  const responsiveNum = pageWidth >= 980 ? 3 : pageWidth < 980 && pageWidth >= 600 ? 2 : 1;
  const gridCustom = responsiveNum ? `grid-cols-${responsiveNum}` : 'grid-cols-3';

  return (
    <div className={`${gridCustom}  mb-6 grid gap-4`}>
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
            <p className="line-clamp-2">{data.title}</p>
          </Link>
        );
      })}
    </div>
  );
}
