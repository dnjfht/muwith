'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { getPlayerMethodValue } from '../../api/youtube_music_api';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { CurrentTimeState, CurrentTrackDataState, OpenCurrentPlayTrackDetailState } from '../../recoil/atoms/atom';
import { DEFAULT_PICTURE } from '@/app/constants';

import { GoChevronUp, GoChevronDown } from 'react-icons/go';
import PlayCurrentMusicSet from '../playCurrentMusicSet/PlayCurrentMusicSet';
interface PlayBarProps {
  player: YT.Player | null;
}

export default function PlayBar({ player }: PlayBarProps) {
  const currentTrackData = useRecoilValue(CurrentTrackDataState);

  const thumbnailUrl = currentTrackData?.album.thumbnailUrl ?? DEFAULT_PICTURE;
  const name = currentTrackData?.name;
  const artists = currentTrackData?.artists.map((artist) => artist.name).join(', ');

  const setCurrentTime = useSetRecoilState(CurrentTimeState);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getPlayerMethodValue(player, 'getCurrentTime', 0.0) as number);
    }, 100);

    return () => clearInterval(interval);
    // 컴포넌트 unmount 시에 interval 해제
  }, [player]);

  const [openCurrentPlayTrackDetail, setOpenCurrentPlayTrackDetail] = useRecoilState(OpenCurrentPlayTrackDetailState);

  return (
    <div className="w-full px-4 mt-2 box-border bg-[#232426] shadow-[0_-10px_10px_10px_rgba(0,0,0,0.3)] text-white flex flex-col justify-center">
      <div className="flex items-center gap-x-8">
        <div className="flex items-center gap-x-2">
          <div className="group relative">
            <Image
              width={1000}
              height={1000}
              className="w-[56px] h-[56px] aspect-square rounded-2xl shadow-[4px_4px_8px_4px_rgba(0,0,0,0.3)]"
              src={thumbnailUrl}
              alt="track_thumbnail"
            />

            <button
              onClick={() => {
                setOpenCurrentPlayTrackDetail((prev) => !prev);
              }}
              className="w-6 h-6 bg-[rgba(35,36,38,0.8)] rounded-full flex items-center justify-center absolute top-1 right-1 text-[1.2rem] opacity-0 group-hover:opacity-100 transition-all duration-700"
            >
              {openCurrentPlayTrackDetail ? <GoChevronDown /> : <GoChevronUp />}
            </button>
          </div>

          <div>
            <p>{name}</p>
            <p className="text-[0.875rem] text-[#a1a1a1]">{artists}</p>
          </div>
        </div>

        <PlayCurrentMusicSet player={player} wrapStyle="w-[50%]" isPlayBar={true} />
      </div>
    </div>
  );
}
