import VolumeControl from './volumeControl/VolumeControl';
import PlayTimeProgress from './playTimeProgress/PlayTimeProgress';
import Button from './button/Button';
import { getPlayerMethodValue } from '@/app/api/youtube_music_api';
import { currentPlayTimePercent } from '@/app/layout-constants';
import { CurrentTimeState, CurrentTrackIndexState } from '@/app/recoil/atoms/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BsFillPlayFill, BsFillPauseFill, BsFillSkipStartFill, BsFillSkipEndFill } from 'react-icons/bs';
import { PiHeart, PiShuffleLight, PiRepeatThin, PiArrowsOutThin, PiPlaylistThin } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';

interface PlayCurrentMusicSetProps {
  player: YT.Player | null;
  wrapStyle: string;
  isPlayBar: boolean;
}

export default function PlayCurrentMusicSet({ player, wrapStyle, isPlayBar }: PlayCurrentMusicSetProps) {
  const currentTime = useRecoilValue(CurrentTimeState);
  const totalTime = getPlayerMethodValue(player, 'getDuration', 0.0) as number;
  const playTimePercent = currentPlayTimePercent(currentTime, totalTime);
  const musicPlayState = getPlayerMethodValue(player, 'getPlayerState', -1) as number;
  const [currentTrackIndex, setCurrentTrackIndex] = useRecoilState(CurrentTrackIndexState);

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
        className={`${isPlayBar ? 'w-[86%] my-[5px] text-[#a1a1a1]' : 'w-full mt-8 mb-4'} mx-auto flex items-center justify-between `}
      >
        <div className={`${isPlayBar ? 'gap-x-7' : 'gap-x-3'} flex items-center`}>
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
            basicStyle={`${isPlayBar ? 'p-[6px] text-[1rem]' : 'p-[8px] text-[1rem]'} border-[1px] border-solid border-white rounded-full`}
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
            basicStyle={`${isPlayBar ? 'p-2 text-[1rem]' : 'p-3 text-[1.6rem]'} border-[1px] border-solid border-white rounded-full`}
          />

          <Button
            onClick={() => {
              setCurrentTrackIndex((prev) => prev + 1);
            }}
            icon={<BsFillSkipEndFill />}
            basicStyle={`${isPlayBar ? 'p-[6px] text-[1rem]' : 'p-[8px] text-[1rem]'} border-[1px] border-solid border-white rounded-full`}
          />
        </div>

        <div className={`${isPlayBar ? 'gap-x-7' : 'gap-x-3'} flex items-center`}>
          <Button icon={<PiRepeatThin />} />
          <Button icon={<PiPlaylistThin />} isHidden={isPlayBar ? '' : 'hidden'} />
          <Button icon={<PiArrowsOutThin />} isHidden={isPlayBar ? '' : 'hidden'} />
          <Button icon={<RiMoreLine />} isHidden={isPlayBar ? 'hidden' : ''} />
        </div>
      </div>

      <VolumeControl player={player} />
    </div>
  );
}
