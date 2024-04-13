'use client';

import { Track } from '@/app/types/api-responses/track';
import SubText from '../text/SubText';
import TrackGroup4 from '../trackGroup/TrackGroup4';

interface NextTrackProps {
  data: Track | null;
}

export default function NextTrack({ data }: NextTrackProps) {
  return (
    <div className="w-full mx-auto p-4 box-border bg-[#232426] rounded-lg text-white">
      <div className="w-full flex justify-between items-center">
        <p className="font-semibold">다음 재생 항목</p>
        <SubText text="재생목록 열기" basicStyle="text-[0.875rem]" />
      </div>

      <TrackGroup4 data={data} />
    </div>
  );
}
