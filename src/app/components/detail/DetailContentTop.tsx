'use client';

import { BsFillPlayFill } from 'react-icons/bs';
import { PiHeart } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';
import { useSetRecoilState } from 'recoil';
import { CurrentPlayListDataState, CurrentPlaylistTitle, CurrentTrackIndexState } from '../../recoil/atoms/atom';
import Button from './button/Button';

interface DetailContentTopProps {
  trackIds: string[];
  hideLikeAndMoreButton?: boolean;
  currentPlaylistTitle: string;
}

export default function Det0ailContentTop({
  trackIds,
  hideLikeAndMoreButton,
  currentPlaylistTitle,
}: DetailContentTopProps) {
  const setCurrentPlaylist = useSetRecoilState(CurrentPlayListDataState);
  const setCurrentTrackIndex = useSetRecoilState(CurrentTrackIndexState);
  const setCurrentPlaylistTitle = useSetRecoilState(CurrentPlaylistTitle);

  return (
    <div className="w-full mb-8 flex items-center gap-x-5 text-[2rem] text-white">
      <Button
        onClick={() => {
          if (typeof Window !== 'undefined') {
            setCurrentPlaylist(trackIds);
            setCurrentTrackIndex(0);
            setCurrentPlaylistTitle(currentPlaylistTitle);
            localStorage.setItem('currentPlaylistTitle', currentPlaylistTitle);
          }
        }}
        icon={<BsFillPlayFill />}
        isHiddenButton={false}
        basicStyle="w-14 h-14 bg-[#1d1e22] border-[1px] border-solid border-white rounded-full flex items-center justify-center text-white"
      />
      <Button icon={<PiHeart />} isHiddenButton={hideLikeAndMoreButton ?? false} basicStyle="text-[#a1a1a1]" />
      <Button icon={<RiMoreLine />} isHiddenButton={hideLikeAndMoreButton ?? false} basicStyle="text-[#a1a1a1]" />
    </div>
  );
}
