'use client';

import Image from 'next/image';

import { convertSecondsToTime, currentPlayTimePercent } from '../layout-constants';
import { useEffect, useState } from 'react';
import { PlayTimeProgressBar } from './PlayTimeProgressBar';
import { getPlayerMethodValue } from '../api/youtube_music_api';
import VolumeControl from './VolumeControl';

import { GoChevronUp, GoChevronDown } from 'react-icons/go';
import { BsFillPlayFill, BsFillPauseFill, BsFillSkipStartFill, BsFillSkipEndFill } from 'react-icons/bs';
import {
  PiHeart,
  PiHeartFill,
  PiShuffleLight,
  PiRepeatThin,
  PiArrowsOutThin,
  PiArrowsInThin,
  PiPlaylistThin,
} from 'react-icons/pi';
import { useRecoilState } from 'recoil';
import { OpenCurrentPlayTrackDetailState, PlayerDataState } from '../recoil/atoms/atom';
import { CurrentPlayList } from '../types';

interface PlayBarProps {
  player: YT.Player | null;
  currentPlayList?: CurrentPlayList[];
}

export default function PlayBar({ player, currentPlayList }: PlayBarProps) {
  const { thumbnail, title, artist } = currentPlayList?.[0] ?? {};

  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getPlayerMethodValue(player, 'getCurrentTime', 0.0) as number);
    }, 100);

    return () => clearInterval(interval);
    // 컴포넌트 unmount 시에 interval 해제
  }, [player]);

  const totalTime = getPlayerMethodValue(player, 'getDuration', 0.0) as number;
  const playTimePercent: number = currentPlayTimePercent(currentTime, totalTime);
  const musicPlayState = getPlayerMethodValue(player, 'getPlayerState', -1) as number;

  const [openCurrentPlayTrackDetail, setOpenCurrentPlayTrackDetail] = useRecoilState(OpenCurrentPlayTrackDetailState);

  return (
    <div className="w-full px-4 box-border bg-[#232426] shadow-[0_-10px_10px_10px_rgba(0,0,0,0.3)] text-white flex flex-col justify-center">
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

        <div className="w-[50%] mx-auto text-[1.2rem]">
          <div className="w-full flex justify-between items-center font-light text-[0.6875rem]">
            <p>{convertSecondsToTime(currentTime)}</p>
            <PlayTimeProgressBar playTimePercent={playTimePercent} player={player} />
            <p>{convertSecondsToTime(totalTime)}</p>
          </div>

          <div className="w-[86%] my-[5px] mx-auto flex items-center justify-between text-[#a1a1a1]">
            <div className="flex items-center gap-x-7">
              <button>
                <PiHeart />
              </button>

              <button>
                <PiShuffleLight />
              </button>
            </div>

            <div className="flex items-center gap-x-8">
              <button className="p-[6px] border-[1px] border-solid border-white rounded-full text-[1rem]">
                <BsFillSkipStartFill />
              </button>

              <button
                onClick={() => {
                  if (player?.playVideo && musicPlayState !== 1) {
                    player.playVideo();
                  } else if (player?.pauseVideo && musicPlayState === 1) {
                    player.pauseVideo();
                  }
                }}
                className="p-2 border-[1px] border-solid border-white rounded-full text-white"
              >
                {musicPlayState !== 1 ? <BsFillPlayFill /> : <BsFillPauseFill />}
              </button>

              <button className="p-[6px] border-[1px] border-solid border-white rounded-full text-[1rem]">
                <BsFillSkipEndFill />
              </button>
            </div>

            <div className="flex items-center gap-x-7">
              <button>
                <PiRepeatThin />
              </button>

              <button>
                <PiPlaylistThin />
              </button>

              <button>
                <PiArrowsOutThin />
              </button>
            </div>
          </div>

          <VolumeControl player={player} />
        </div>
      </div>
    </div>
  );
}
