'use client';

import { Track } from '@/app/types/api-responses/track';
import SubText from '../text/SubText';
import TrackGroup4 from '../trackGroup/TrackGroup4';
import { useRouter } from 'next/navigation';
import { AppPage } from '@/app/types/app';

interface NextTrackProps {
  data: Track | null;
  isCurrentPlaylistHidden?: string;
}

export default function NextTrack({ data, isCurrentPlaylistHidden }: NextTrackProps) {
  const router = useRouter();

  return (
    <div className="w-full mx-auto p-4 box-border bg-[#232426] rounded-lg text-white">
      <div className="w-full flex justify-between items-center">
        <p className="font-semibold">다음 재생 항목</p>
        <SubText
          onClick={() => {
            router.push(AppPage.CURRENTPLAYLIST);
          }}
          text="재생목록 열기"
          basicStyle={`text-[0.875rem] cursor-pointer ${isCurrentPlaylistHidden}`}
        />
      </div>

      <TrackGroup4 data={data} />
    </div>
  );
}
