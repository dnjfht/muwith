'use client';

import { useRecoilValue } from 'recoil';
import TrackGroup from './TrackGroup';
import { PageResponsiveNumState } from '../recoil/atoms/atom';
import Link from 'next/link';
import { AppPage, ListData } from '../types';
import { useParams, usePathname } from 'next/navigation';

export interface RecommenedListProps {
  title?: string;
  datas: ListData[];
}

export default function RecommenedList({ title, datas }: RecommenedListProps) {
  const pathname = usePathname();
  const searchType = useParams()?.searchType;

  const responsiveNum = useRecoilValue(PageResponsiveNumState);
  const gridCustom = responsiveNum ? `grid-cols-${responsiveNum}` : 'grid-cols-8';
  const slicedDatas = !searchType ? datas.slice(0, responsiveNum ? responsiveNum : 8) : datas;

  return (
    <div className="w-full py-6">
      <div className="w-full flex items-end justify-between">
        {title && <h1 className="mb-2 text-[1.5rem] font-semibold">{title}</h1>}

        {!pathname.includes(AppPage.SEARCH) && (
          <Link
            href={
              {
                // pathname: `/section/${datas.id}`,
              }
            }
            className="text-[0.875rem] font-semibold text-[#a1a1a1] cursor-pointer"
          >
            모두 표시
          </Link>
        )}
      </div>

      <div className={`${gridCustom} w-full grid gap-x-6`}>
        {slicedDatas?.map((data) => {
          return (
            <TrackGroup
              key={data.id}
              id={data.id}
              image={data.images[0]?.url}
              title={data.name}
              type={data.type}
              artists={data.artists}
              release={data.release_date}
              owner={data.owner}
            />
          );
        })}
      </div>
    </div>
  );
}
