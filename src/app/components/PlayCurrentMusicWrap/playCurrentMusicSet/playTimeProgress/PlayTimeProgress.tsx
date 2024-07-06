import { convertSecondsToTime } from '@/app/layout-constants';
import { PlayTimeProgressBar } from './playTimeProgressBar/PlayTimeProgressBar';

interface PlayTimeProgressProps {
  player: YT.Player | null;
  currentTime: number;
  totalTime: number;
  playTimePercent: number;
  wrapStyle: string;
  currentTimeStyle: string;
  PlayTimeProgressBarStyle: string;
  totalTimeStyle: string;
}
export default function PlayTimeProgress({
  player,
  currentTime,
  totalTime,
  playTimePercent,
  wrapStyle,
  currentTimeStyle,
  PlayTimeProgressBarStyle,
  totalTimeStyle,
}: PlayTimeProgressProps) {
  return (
    <div className={`${wrapStyle} w-full font-light text-[0.6875rem] flex relative`}>
      <p className={`${currentTimeStyle}`}>{convertSecondsToTime(currentTime)}</p>
      <PlayTimeProgressBar playTimePercent={playTimePercent} player={player} wrapStyle={PlayTimeProgressBarStyle} />
      <p className={`${totalTimeStyle} order-3`}>{convertSecondsToTime(totalTime)}</p>
    </div>
  );
}
