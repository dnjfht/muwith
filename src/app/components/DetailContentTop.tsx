'use client';

import { BsFillPlayFill } from 'react-icons/bs';
import { PiHeart } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';
import { CurrentPlayListDataState, CurrentTrackIndexState } from '../recoil/atoms/atom';

interface DetailContentTopProps {
  trackIds: string[];
  hideLikeAndMoreButton?: boolean;
}

export default function DetailContentTop({ trackIds, hideLikeAndMoreButton }: DetailContentTopProps) {
  const setCurrentPlaylist = useSetRecoilState(CurrentPlayListDataState);
  const setCurrentTrackIndex = useSetRecoilState(CurrentTrackIndexState);

  return (
    <div className="w-full mb-8 flex items-center gap-x-5 text-[2rem] text-white">
      <button
        className="w-14 h-14 bg-[#1d1e22] border-[1px] border-solid border-white rounded-full flex items-center justify-center text-white"
        onClick={() => {
          if (typeof Window !== 'undefined') {
            setCurrentPlaylist(trackIds);
            setCurrentTrackIndex(0);
          }
        }}
      >
        <BsFillPlayFill />
      </button>
      {!hideLikeAndMoreButton && (
        <>
          <button>
            <PiHeart />
          </button>
          <button className="text-[#a1a1a1]">
            <RiMoreLine />
          </button>
        </>
      )}
    </div>
  );
}
