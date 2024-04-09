'use client';

import { useRecoilValue } from 'recoil';
import TrackGroup from '../trackGroup/TrackGroup';
import { PageResponsiveNumState } from '../../recoil/atoms/atom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppPage } from '../../types/app';
import { MuwithObject, MuwithObjectType } from '../../types/api-responses/global';
import { getDescription } from '@/utilities';
import MainText from '../text/MainText';

export interface RecommenedListProps {
  type: MuwithObjectType;
  title?: string;
  titleColorStyle?: string;
  showAllColorStyle?: string;
  datas: MuwithObject[];
  isSlicedData?: boolean;
}

export default function RecommenedList({
  type,
  title,
  titleColorStyle,
  showAllColorStyle,
  datas,
  isSlicedData,
}: RecommenedListProps) {
  const pathname = usePathname();

  const responsiveNum = useRecoilValue(PageResponsiveNumState);
  const gridCustom = responsiveNum ? `grid-cols-${responsiveNum}` : 'grid-cols-8';
  const allDatas = isSlicedData ? datas.slice(0, responsiveNum ? responsiveNum : 8) : datas;

  const isTrackDataOne = pathname.includes(AppPage.TRACK) && datas.length === 1;
  const isShowAllColor =
    (pathname.includes(AppPage.TRACK) && datas.length > responsiveNum) || pathname === AppPage.HOME
      ? 'block'
      : 'hidden';

  return (
    <div className={`${isTrackDataOne ? 'w-auto' : 'w-full'} py-6`}>
      <div className="w-full flex items-center justify-between">
        <MainText isHidden={title ? 'block' : 'hidden'} text={title ?? ''} basicStyle={`${titleColorStyle}`} />
        <Link
          href={
            {
              // pathname: `/section/${datas.id}`,
            }
          }
          className={`${isShowAllColor} ${showAllColorStyle ?? 'text-[#a1a1a1]'} text-[0.875rem] font-semibold cursor-pointer`}
        >
          모두 표시
        </Link>
      </div>

      <div className={`${isTrackDataOne ? 'w-[200px]' : `w-full grid gap-x-6 ${gridCustom}`}`}>
        {allDatas.map((data) => (
          <TrackGroup
            key={data.id}
            image={data.thumbnailUrl}
            isThumbnailCircle={type === MuwithObjectType.ARTIST}
            title={data.name}
            description={getDescription(type, data)}
            clickLink={`/${type}/${data.id}`}
          />
        ))}
      </div>
    </div>
  );
}
