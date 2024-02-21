'use client';

import Image from 'next/image';

import { GoChevronUp, GoChevronDown } from 'react-icons/go';

import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { convertSecondsToTime, currentPlayTimePercent } from '../layout-constants';
import { useEffect, useState } from 'react';
import { PlayTimeProgressBar } from './PlayTimeProgressBar';
import { getPlayerMethodValue } from '../api/youtube_music_api';

interface PlayBarProps {
  currentPlayList?: {
    id: string;
    type: string;
    thumbnail: string;
    title: string;
    artist: string;
    album: string;
    duration: string;
    isLikeSong: boolean;
  }[];
  setOpenCurrentPlayTrackDetail: React.Dispatch<React.SetStateAction<boolean>>;
  openCurrentPlayTrackDetail: boolean;
  player: YT.Player | null;
}

export default function PlayBar({
  currentPlayList,
  setOpenCurrentPlayTrackDetail,
  openCurrentPlayTrackDetail,
  player,
}: PlayBarProps) {
  const { thumbnail, title, artist } = currentPlayList?.[0] ?? {};

  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getPlayerMethodValue(player, 'getCurrentTime', 0.0));
    }, 100);

    return () => clearInterval(interval);
    // 컴포넌트 unmount 시에 interval 해제
  }, [player]);

  const totalTime = getPlayerMethodValue(player, 'getDuration', 0.0);
  const playTimePercent: number = currentPlayTimePercent(currentTime, totalTime);
  const musicPlayState = getPlayerMethodValue(player, 'getPlayerState', -1);

  return (
    <div className="w-full px-4 py-1 box-border bg-[#232426] shadow-[0_-10px_10px_10px_rgba(0,0,0,0.3)] text-white flex flex-col justify-center">
      <div className="flex items-center gap-x-8">
        <div className="flex items-center gap-x-2">
          <div className="group relative">
            {thumbnail && (
              <Image
                width={1000}
                height={1000}
                className="w-[56px] h-[56px] aspect-square rounded-2xl shadow-[4px_4px_8px_4px_rgba(0,0,0,0.3)]"
                src={thumbnail ?? ''}
                alt="track_thumbnail"
              />
            )}

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
            <p>{title}</p>
            <p className="text-[0.875rem] text-[#a1a1a1]">{artist}</p>
          </div>
        </div>

        <div className="w-full flex flex-col items-center">
          <div className="w-full flex justify-center items-center gap-x-6 text-[0.75rem] font-light">
            <p>{convertSecondsToTime(currentTime)}</p>
            <PlayTimeProgressBar playTimePercent={playTimePercent} player={player} />
            <p>{convertSecondsToTime(totalTime)}</p>
          </div>

          <div className="w-full my-2 flex items-center justify-center">
            <button
              onClick={() => {
                if (musicPlayState !== 1 && player) {
                  player.playVideo();
                } else if (musicPlayState === 1 && player) {
                  player.pauseVideo();
                }
              }}
              className="p-2 border-[1px] border-solid border-white rounded-full text-white text-[1.2rem]"
            >
              {musicPlayState !== 1 ? <BsFillPlayFill /> : <BsFillPauseFill />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
