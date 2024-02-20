'use client';

import Image from 'next/image';

import { GoChevronUp, GoChevronDown } from 'react-icons/go';

import { CiPlay1, CiPause1 } from 'react-icons/ci';

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
  musicPlayState: boolean;
  setMusicPlayState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PlayBar({
  currentPlayList,
  setOpenCurrentPlayTrackDetail,
  openCurrentPlayTrackDetail,
  player,
  musicPlayState,
  setMusicPlayState,
}: PlayBarProps) {
  const { thumbnail, title, artist } = currentPlayList?.[0] ?? {};

  return (
    <div className="w-full px-4 py-3 box-border bg-[#232426] shadow-[0_-10px_10px_10px_rgba(0,0,0,0.3)] text-white">
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

        <div>
          <button
            onClick={() => {
              if (!musicPlayState) {
                player?.playVideo();
                setMusicPlayState(true);
              } else {
                player?.pauseVideo();
                setMusicPlayState(false);
              }
            }}
            className="p-4 border-[1px] border-solid border-white rounded-full text-white text-[2rem]"
          >
            {!musicPlayState ? <CiPlay1 /> : <CiPause1 />}
          </button>
        </div>
      </div>
    </div>
  );
}
