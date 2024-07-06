'use client';

import { useRecoilState, useRecoilValue } from 'recoil';
import SubText from '../text/SubText';
import { CurrentPlayListDataState, CurrentTrackIndexState } from '@/app/recoil/atoms/atom';
import { fetchSpotifyTrackDetailData } from '@/app/api/spotify';
import { useEffect, useState } from 'react';
import { Track } from '@/app/types/api-responses/track';
import TrackGroup2 from '../trackGroup/TrackGroup2';

export default function NextPlaylist() {
  const [nextPlaylistInfo, setNextPlaylistInfo] = useState<Track[]>([]);

  const currentTrackIndex = useRecoilValue(CurrentTrackIndexState);
  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(CurrentPlayListDataState);
  const nextPlaylistIdArr: string[] = currentPlaylist.slice(currentTrackIndex + 1);

  console.log(nextPlaylistIdArr);
  const fetchNextPlaylist = async () => {
    const details = await Promise.all(
      nextPlaylistIdArr.map((id) =>
        fetchSpotifyTrackDetailData(id).catch((error) => {
          console.error(`Error fetching data for id ${id}:`, error);
          return null;
        }),
      ),
    );
    setNextPlaylistInfo(details.filter((detail) => detail !== null) as Track[]);
  };

  useEffect(() => {
    fetchNextPlaylist();
  }, [currentTrackIndex, currentPlaylist]);

  console.log('nextPlaylistInfo', nextPlaylistInfo, 'currentPlaylist', currentPlaylist, currentTrackIndex);

  return (
    <div className="w-full mt-10">
      <div className="w-full mb-2 flex items-center justify-between">
        <SubText text="다음 재생 플레이리스트" />

        <button
          className="px-2 py-1 rounded-3xl text-[0.875rem] font-semibold border-[2px] border-solid border-[#232426]"
          onClick={() => {
            setCurrentPlaylist(currentPlaylist.slice(0, currentTrackIndex + 1));
          }}
        >
          재생목록 지우기
        </button>
      </div>

      {nextPlaylistInfo.map((data, idx) => (
        <TrackGroup2
          key={data.id}
          idx={idx + 2}
          currentIdx={currentTrackIndex + idx + 1}
          data={data}
          isGroupTrack={true}
          isHiddenIcon="hidden"
          idxWidthStyle="w-[4%]"
          imgWidthStyle="w-[50%]"
          albumTitleWidthStyle="w-[40%]"
          formatDateStyle="hidden"
          buttonWrapStyle="w-[6%]"
          trackIdArr={currentPlaylist}
        />
      ))}
    </div>
  );
}
