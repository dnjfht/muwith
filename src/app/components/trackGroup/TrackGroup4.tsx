'use client';

// 다음 재생 항목과 같은 구조에서 사용

import { DEFAULT_PICTURE } from '@/app/constants';
import { Track } from '@/app/types/api-responses/track';
import Image from 'next/image';
import SubText from '../text/SubText';
import { CurrentTrackIndexState } from '@/app/recoil/atoms/atom';
import { useSetRecoilState } from 'recoil';

import { CiMusicNote1 } from 'react-icons/ci';

interface TrackGroup4Props {
  data: Track | null;
}

export default function TrackGroup4({ data }: TrackGroup4Props) {
  const setCurrentTrackIndex = useSetRecoilState(CurrentTrackIndexState);

  const thumbnailUrl = data?.album.thumbnailUrl ?? DEFAULT_PICTURE;
  const name = data?.name;
  const artistsName = data?.artists.map((artist: { name: string }) => artist.name).join(', ');
  console.log(data, thumbnailUrl, name, artistsName);

  return (
    <div className="w-full mt-4 mb-1 flex items-center gap-x-3">
      <button
        onClick={() => {
          setCurrentTrackIndex((prev) => prev + 1);
        }}
      >
        <CiMusicNote1 />
      </button>

      <div className="flex items-center gap-x-2">
        <Image className="w-10 aspect-square rounded-lg" width={500} height={500} src={thumbnailUrl} alt="track_img" />

        <div>
          <p>{name}</p>
          <SubText text={artistsName as string} basicStyle="text-[0.875rem]" />
        </div>
      </div>
    </div>
  );
}
