'use client';

import { useRecoilValue } from 'recoil';
import SubText from '../text/SubText';
import { CurrentPlayListDataState, CurrentTrackDataState, CurrentTrackIndexState } from '@/app/recoil/atoms/atom';
import TrackGroup2 from '../trackGroup/TrackGroup2';

export default function CurrentMusic() {
  const currentTrackIndex = useRecoilValue(CurrentTrackIndexState);
  const currentPlaylist = useRecoilValue(CurrentPlayListDataState);
  const currentTrack = useRecoilValue(CurrentTrackDataState);

  return (
    <div className="w-full">
      <SubText text="지금 재생 중" basicStyle="mb-2" />

      {currentTrack && (
        <TrackGroup2
          idx={1}
          currentIdx={currentTrackIndex}
          data={currentTrack}
          isGroupTrack={true}
          isHiddenIcon="hidden"
          idxWidthStyle="w-[4%]"
          imgWidthStyle="w-[50%]"
          albumTitleWidthStyle="w-[40%]"
          formatDateStyle="hidden"
          buttonWrapStyle="w-[6%]"
          trackIdArr={currentPlaylist}
        />
      )}
    </div>
  );
}
