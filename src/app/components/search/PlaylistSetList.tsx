'use client';

import { PlaylistSet } from '@/app/types/api-responses/playlist-set';
import MainText from '../text/MainText';
import { PageResponsiveNumState } from '@/app/recoil/atoms/atom';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { DEFAULT_PICTURE } from '@/app/constants';

interface PlaylistSetProps {
  title: string;
  datas: PlaylistSet[];
}

export default function PlaylistSetList({ title, datas }: PlaylistSetProps) {
  const responsiveNum = useRecoilValue(PageResponsiveNumState);
  const gridCustom = responsiveNum ? `grid-cols-${responsiveNum}` : 'grid-cols-8';

  const bgColors = [
    'bg-[#ff007c]',
    'bg-[#5e817e]',
    'bg-[#8862ad]',
    'bg-[#ff0000]',
    'bg-[#758cc6]',
    'bg-[#ffae22]',
    'bg-[#232426]',
    'bg-[#ff5500]',
    'bg-[#947260]',
    'bg-[#5141cf]',
    'bg-[#cb743b]',
    'bg-[#6d1547]',
  ];

  const hoverBgColors = [
    'hover:bg-[#b70c5f]',
    'hover:bg-[#324543]',
    'hover:bg-[#4e306c]',
    'hover:bg-[#b30e0e]',
    'hover:bg-[#435789]',
    'hover:bg-[#d08608]',
    'hover:bg-[#0a0a0a]',
    'hover:bg-[#cb4b0c]',
    'hover:bg-[#5f493c]',
    'hover:bg-[#372d7e]',
    'hover:bg-[#7e4f2f]',
    'hover:bg-[#3d0927]',
  ];

  return (
    <div className="w-full py-6">
      <MainText text={title} />

      <div className={`${gridCustom} w-full grid gap-x-6 gap-y-6`}>
        {datas.map((data, index) => (
          <div
            key={data.id}
            className={`${bgColors[index % bgColors.length]} w-full p-4 box-border aspect-square rounded-lg shadow-[0_8px_6px_2px_rgba(0,0,0,0.2)] overflow-hidden ${hoverBgColors[index % hoverBgColors.length]} transition-all duration-700`}
          >
            <h1 className="text-[1.5rem] font-semibold text-white">{data.name}</h1>
            <Image
              className="w-40 h-40 object-cover rounded-sm rotate-45 translate-x-20 translate-y-6 shadow-[-2px_8px_6px_2px_rgba(0,0,0,0.2)]"
              width={1000}
              height={1000}
              src={data.thumbnailUrl ?? DEFAULT_PICTURE}
              alt="PlaylistSetImage"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
