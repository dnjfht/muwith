'use client';

import { useEffect } from 'react';
import VolumeControl from './volumeControl/VolumeControl';
import PlayTimeProgress from './playTimeProgress/PlayTimeProgress';
import Button from './button/Button';
import { getPlayerMethodValue } from '@/app/api/youtube_music_api';
import { currentPlayTimePercent } from '@/app/layout-constants';
import {
  CurrentPlaylistRepeatClickNumState,
  CurrentTimeState,
  CurrentTrackIndexState,
  OpenFullScreenCurrentPlayDetailState,
} from '@/app/recoil/atoms/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { AppPage } from '@/app/types/app';

import { BsFillPlayFill, BsFillPauseFill, BsFillSkipStartFill, BsFillSkipEndFill } from 'react-icons/bs';
import {
  PiHeart,
  PiShuffleLight,
  PiRepeatThin,
  PiArrowsOutThin,
  PiPlaylistThin,
  PiRepeatOnceThin,
} from 'react-icons/pi';

interface PlayCurrentMusicSetProps {
  player: YT.Player | null;
  wrapStyle: string;
  smallIconStyle?: string;
  isPlayBar: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  playCurrentMusicSetStyle?: string;
  playIconStyle?: string;
  prevNextIconStyle?: string;
}

export default function PlayCurrentMusicSet({
  player,
  wrapStyle,
  smallIconStyle,
  isPlayBar,
  icon,
  onClick,
  playCurrentMusicSetStyle,
  playIconStyle,
  prevNextIconStyle,
}: PlayCurrentMusicSetProps) {
  const router = useRouter();

  const currentTime = useRecoilValue(CurrentTimeState);
  const totalTime = getPlayerMethodValue(player, 'getDuration', 0.0) as number;
  const playTimePercent = currentPlayTimePercent(currentTime, totalTime);
  const musicPlayState = getPlayerMethodValue(player, 'getPlayerState', -1) as number;

  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(CurrentTrackIndexState);
  const setOpenFullScreenCurrentPlayDetail = useSetRecoilState(OpenFullScreenCurrentPlayDetailState);
  const [currentPlaylistRepeatClickNum, setCurrentPlaylistRepeatClickNum] = useRecoilState(
    CurrentPlaylistRepeatClickNumState,
  );

  useEffect(() => {
    if (typeof Window === 'undefined') return;

    const repeatClickNum = localStorage.getItem('currentPlaylistRepeatClickNum');
    if (repeatClickNum) setCurrentPlaylistRepeatClickNum(JSON.parse(repeatClickNum));
  }, []);

  useEffect(() => {
    /*
    musicPlayState 상태 코드 별 설명
    -1: 시작되지 않음
    0: 종료
    1: 재생 중
    2: 일시중지
    3: 버퍼링
    5: 동영상 신호
    */
    if ((currentPlaylistRepeatClickNum - 2) % 3 === 0 && musicPlayState === 0) {
      setCurrentTrackIndex((prev) => prev);
      player?.playVideo();
    } else if ((currentPlaylistRepeatClickNum - 2) % 3 !== 0 && musicPlayState === 0) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  }, [currentPlaylistRepeatClickNum, musicPlayState]);

  return (
    <div className={`${wrapStyle} mx-auto text-[1.2rem]`}>
      <PlayTimeProgress
        player={player}
        currentTime={currentTime}
        totalTime={totalTime}
        playTimePercent={playTimePercent}
        wrapStyle={isPlayBar ? 'justify-between items-center' : 'flex-col'}
        currentTimeStyle={isPlayBar ? 'order-1' : 'order-2 absolute top-4 left-0'}
        PlayTimeProgressBarStyle={isPlayBar ? 'order-2 w-[86%]' : 'order-1 w-full'}
        totalTimeStyle={isPlayBar ? '' : 'absolute top-4 right-0'}
      />

      <div
        className={`${isPlayBar ? 'w-[86%] my-[5px] text-[#a1a1a1]' : playCurrentMusicSetStyle} mx-auto flex items-center justify-between `}
      >
        <div className={`${isPlayBar ? 'gap-x-7' : 'gap-x-3'} ${smallIconStyle} flex items-center`}>
          <Button icon={<PiHeart />} />
          <Button icon={<PiShuffleLight />} />
        </div>

        <div className={`${isPlayBar ? 'gap-x-8' : 'gap-x-[13px]'} flex items-center`}>
          <Button
            onClick={() => {
              if (currentTrackIndex > 0) {
                setCurrentTrackIndex((prev) => prev - 1);
              }
            }}
            icon={<BsFillSkipStartFill />}
            basicStyle={`${isPlayBar ? 'p-[6px] text-[1rem]' : prevNextIconStyle} border-[1px] border-solid border-white rounded-full`}
          />

          <Button
            onClick={() => {
              if (player?.playVideo && musicPlayState !== 1) {
                player.playVideo();
              } else if (player?.pauseVideo && musicPlayState === 1) {
                player.pauseVideo();
              }
            }}
            icon={musicPlayState !== 1 ? <BsFillPlayFill /> : <BsFillPauseFill />}
            basicStyle={`${isPlayBar ? 'p-2 text-[1rem]' : playIconStyle} border-[1px] border-solid border-white rounded-full`}
          />

          <Button
            onClick={() => {
              setCurrentTrackIndex((prev) => prev + 1);
            }}
            icon={<BsFillSkipEndFill />}
            basicStyle={`${isPlayBar ? 'p-[6px] text-[1rem]' : prevNextIconStyle} border-[1px] border-solid border-white rounded-full`}
          />
        </div>

        <div className={`${isPlayBar ? 'gap-x-7' : 'gap-x-3'} ${smallIconStyle} flex items-center`}>
          <Button
            onClick={() => {
              const newCount = (currentPlaylistRepeatClickNum + 1) % 3;
              setCurrentPlaylistRepeatClickNum(currentPlaylistRepeatClickNum + 1);
              localStorage.setItem('currentPlaylistRepeatClickNum', JSON.stringify(currentPlaylistRepeatClickNum + 1));
            }}
            icon={(currentPlaylistRepeatClickNum - 2) % 3 === 0 ? <PiRepeatOnceThin /> : <PiRepeatThin />}
            basicStyle={`${currentPlaylistRepeatClickNum % 3 === 0 ? '' : 'text-[#FFAB59]'}`}
          />
          <Button
            onClick={() => {
              router.push(AppPage.CURRENTPLAYLIST);
            }}
            icon={<PiPlaylistThin />}
            isHidden={isPlayBar ? '' : 'hidden'}
          />
          <Button
            onClick={() => {
              setOpenFullScreenCurrentPlayDetail(true);
            }}
            icon={<PiArrowsOutThin />}
            isHidden={isPlayBar ? '' : 'hidden'}
          />
          <Button onClick={onClick} icon={icon} isHidden={isPlayBar ? 'hidden' : ''} />
        </div>
      </div>

      <VolumeControl player={player} />
    </div>
  );
}
