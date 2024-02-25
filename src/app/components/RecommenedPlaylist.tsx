'use client';

import { useRecoilValue } from 'recoil';
import TrackGroup from './TrackGroup';
import { PageResponsiveNumState } from '../recoil/atoms/atom';
import Link from 'next/link';
import { RecommenedPlaylistProps } from '../types';

export default function RecommenedPlaylist({ title, datas }: RecommenedPlaylistProps) {
  const responsiveNum = useRecoilValue(PageResponsiveNumState);
  const gridCustom = responsiveNum ? `grid-cols-${responsiveNum}` : 'grid-cols-8';
  const playlistDatas = datas.data;
  const slicedDatas = playlistDatas.slice(0, responsiveNum ? responsiveNum : 8);

  return (
    <div className="w-full py-6">
      <div className="w-full flex items-end justify-between">
        <h1 className="mb-5 text-[1.5rem] font-semibold">{title}</h1>
        <Link
          href={{
            pathname: `/section/${datas.id}`,
            query: { title: datas.title },
          }}
          className="text-[0.875rem] font-semibold text-[#a1a1a1] cursor-pointer"
        >
          모두 표시
        </Link>
      </div>

      <div className={`${gridCustom} w-full grid gap-x-6`}>
        {slicedDatas?.map((data) => {
          return <TrackGroup key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
}
