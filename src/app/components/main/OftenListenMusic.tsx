'use client';

import { useRecoilValue } from 'recoil';
import { PageWidthState } from '../../recoil/atoms/atom';
import { OftenListenData } from '@/app/types/api-responses/home';
import TrackGroup3 from '../trackGroup/TrackGroup3';

interface OftenListenMusicProps {
  datas: OftenListenData[];
}

export default function OftenListenMusic({ datas }: OftenListenMusicProps) {
  const pageWidth = useRecoilValue(PageWidthState);
  const gridCustom =
    pageWidth >= 980 || !pageWidth
      ? 'grid-cols-3'
      : pageWidth < 980 && pageWidth >= 600
        ? 'grid-cols-2'
        : 'grid-cols-1';

  return (
    <div className={`${gridCustom} mb-6 grid gap-4`}>
      {datas.map((data) => (
        <TrackGroup3 key={data.id} data={data} />
      ))}
    </div>
  );
}
