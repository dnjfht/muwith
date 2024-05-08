import Image from 'next/image';
import PlayCurrentMusicSet from './playCurrentMusicSet/PlayCurrentMusicSet';

interface PlayCurrentMusicWrapProps {
  thumbnailUrl: string;
  artists: string;
  name: string;
  player: YT.Player | null;
  basicStyle: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  smallIconStyle?: string;
  playCurrentMusicSetStyle?: string;
  playIconStyle?: string;
  prevNextIconStyle?: string;
}

export default function PlayCurrentMusicWrap({
  thumbnailUrl,
  artists,
  name,
  player,
  basicStyle,
  icon,
  onClick,
  smallIconStyle,
  playCurrentMusicSetStyle,
  playIconStyle,
  prevNextIconStyle,
}: PlayCurrentMusicWrapProps) {
  return (
    <div
      className={`${basicStyle} aspect-square p-4 box-border bg-gradient-170deg rounded-lg shadow-[5px_5px_8px_4px_rgba(0,0,0,0.4)] text-white`}
    >
      <div className="w-full flex items-center gap-x-4">
        <Image
          className="w-[46%] aspect-square rounded-lg shadow-[2px_2px_10px_6px_rgba(0,0,0,0.3)]"
          width={500}
          height={500}
          src={thumbnailUrl}
          alt="track_img"
        />
        <div>
          <p className="text-[#a1a1a1]">{artists}</p>
          <h1 className="mt-2 text-[1.75rem] font-semibold">{name}</h1>
        </div>
      </div>

      <div className="w-full mt-10">
        <PlayCurrentMusicSet
          player={player}
          wrapStyle="w-full"
          smallIconStyle={smallIconStyle}
          isPlayBar={false}
          icon={icon}
          onClick={onClick}
          playCurrentMusicSetStyle={playCurrentMusicSetStyle}
          playIconStyle={playIconStyle}
          prevNextIconStyle={prevNextIconStyle}
        />
      </div>
    </div>
  );
}
