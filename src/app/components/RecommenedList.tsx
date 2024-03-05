'use client';

import { useRecoilValue } from 'recoil';
import TrackGroup from './TrackGroup';
import { PageResponsiveNumState } from '../recoil/atoms/atom';
import Link from 'next/link';
import { ListData } from '../types';
import { useParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import { AppPage } from '../types/app';

interface PlaylistSetType {
  id: string;
  name: string;
  thumbnailUrl: string;
}

export interface RecommenedListProps {
  title?: string;
  type?: string;
  datas?: ListData[];
  datas2?: PlaylistSetType[];
}

export default function RecommenedList({ title, datas, type, datas2 }: RecommenedListProps) {
  const pathname = usePathname();
  const searchText = useParams()?.searchText;
  const searchType = useParams()?.searchType;
  const playlistCategory = pathname.includes(AppPage.SEARCH) && !searchText && !searchType;

  const detailType =
    pathname.includes(AppPage.ALBUM) ||
    pathname.includes(AppPage.TRACK) ||
    pathname.includes(AppPage.TRACK) ||
    pathname.includes(AppPage.PLAYLIST);

  const trackDataOnlyOne = pathname.includes(AppPage.TRACK) && datas && datas.length === 1;

  const responsiveNum = useRecoilValue(PageResponsiveNumState);
  const gridCustom = responsiveNum ? `grid-cols-${responsiveNum}` : 'grid-cols-8';
  const slicedDatas = !searchType ? datas?.slice(0, responsiveNum ? responsiveNum : 8) : datas;

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
    <div className={`${trackDataOnlyOne ? 'w-auto' : 'w-full'} py-6`}>
      <div className="w-full flex items-center justify-between">
        {title && <h1 className={`${detailType && 'text-white'} mb-2 text-[1.5rem] font-semibold`}>{title}</h1>}

        {(pathname === AppPage.HOME || (pathname.includes(AppPage.TRACK) && datas && datas.length > responsiveNum)) && (
          <Link
            href={
              {
                // pathname: `/section/${datas.id}`,
              }
            }
            className={`${detailType ? 'text-[#c7c7c7]' : 'text-[#a1a1a1]'} text-[0.875rem] font-semibold cursor-pointer`}
          >
            모두 표시
          </Link>
        )}
      </div>

      {!playlistCategory ? (
        <div className={`${trackDataOnlyOne ? 'w-[200px]' : `w-full grid gap-x-6 ${gridCustom}`}`}>
          {slicedDatas?.map((data) => {
            return (
              <TrackGroup
                key={data.id}
                id={data.id}
                image={data.thumbnailUrl}
                title={data.name}
                type={type as string}
                tracksNum={data.totalTracks}
                release={data.releaseDate}
                des={data.description}
              />
            );
          })}
        </div>
      ) : (
        <div className={`${gridCustom} w-full grid gap-x-6 gap-y-6`}>
          {datas2?.map((set: PlaylistSetType, index: number) => {
            return (
              <div
                key={set.id}
                className={`${bgColors[index % bgColors.length]} w-full p-4 box-border aspect-square rounded-lg shadow-[0_8px_6px_2px_rgba(0,0,0,0.2)] overflow-hidden ${hoverBgColors[index % hoverBgColors.length]} transition-all duration-700`}
              >
                <h1 className="text-[1.5rem] font-semibold text-white">{set.name}</h1>
                <Image
                  className="w-40 h-40 object-cover rounded-sm rotate-45 translate-x-20 translate-y-6 shadow-[-2px_8px_6px_2px_rgba(0,0,0,0.2)]"
                  width={1000}
                  height={1000}
                  src={set.thumbnailUrl}
                  alt="PlaylistSetImage"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
