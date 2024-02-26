'use client';

import { fetchListenAgainRecommened2 } from '@/app/api/home_api';
import TrackGroup from '@/app/components/TrackGroup';
import { PageResponsiveNumState } from '@/app/recoil/atoms/atom';
import { PlaylistData } from '@/app/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function Section() {
  const searchParams = useSearchParams();
  const title: string | null = searchParams.get('title');

  const [datas, setDatas] = useState<PlaylistData | null>(null);

  useEffect(() => {
    const fetchListenAgainRecommenedData = async () => {
      if (title) {
        setDatas(await fetchListenAgainRecommened2(title));
      }
    };

    fetchListenAgainRecommenedData();
  }, [title]);

  const playlistDatas = datas?.data;

  const responsiveNum = useRecoilValue(PageResponsiveNumState);
  const gridCustom = responsiveNum ? `grid-cols-${responsiveNum}` : 'grid-cols-8';

  return (
    <div className="w-full px-6 py-4 box-border">
      <h1 className="text-[1.5rem] font-semibold">{title === 'listen_again_recommened' && '다시 들어보세요'}</h1>
      <div className={`w-full mt-2 grid ${gridCustom} gap-x-6`}>
        {playlistDatas?.map((data) => {
          return <TrackGroup key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
}
