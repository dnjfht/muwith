'use client';

import {
  CurrentPlayListDataState,
  CurrentTrackDataState,
  CurrentTrackIndexState,
  OpenFullScreenCurrentPlayDetailState,
} from '@/app/recoil/atoms/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import PlayCurrentMusicWrap from '../PlayCurrentMusicWrap/PlayCurrentMusicWrap';
import { DEFAULT_PICTURE } from '@/app/constants';
import { useEffect, useState } from 'react';
import { fetchSpotifyTrackDetailData } from '@/app/api/spotify';
import Lp from './lp/Lp';
import NextTrack from './NextTrack';
import { Track } from '@/app/types/api-responses/track';

import { PiArrowsInThin } from 'react-icons/pi';

interface FullScreenCurrentPlayDetailProps {
  player: YT.Player | null;
}
export default function FullScreenCurrentPlayDetail({ player }: FullScreenCurrentPlayDetailProps) {
  const [openFullScreenCurrentPlayDetail, setOpenFullScreenCurrentPlayDetail] = useRecoilState(
    OpenFullScreenCurrentPlayDetailState,
  );

  const currentTrackData = useRecoilValue(CurrentTrackDataState);

  const thumbnailUrl = currentTrackData?.album.thumbnailUrl ?? DEFAULT_PICTURE;
  const name = currentTrackData?.name;
  const artists = currentTrackData?.artists.map((artist) => artist.name).join(', ');

  const [nextTrack, setNextTrack] = useState({});

  const currentPlaylist = useRecoilValue(CurrentPlayListDataState);
  const currentTrackIndex = useRecoilValue(CurrentTrackIndexState);
  const nextTrackId = currentPlaylist[currentTrackIndex + 1];

  const loadNextTrackData = async () => {
    setNextTrack(await fetchSpotifyTrackDetailData(nextTrackId));
  };

  useEffect(() => {
    if (nextTrackId) {
      loadNextTrackData();
    }
  }, [nextTrackId]);

  return (
    <div
      className={`${openFullScreenCurrentPlayDetail ? 'block' : 'hidden'} w-full h-screen bg-[#ebebeb] fixed top-0 left-0 flex justify-between leading-tight`}
    >
      <div className="w-[25%] ml-10 flex flex-col justify-between text-[3rem]">
        <h1 className="w-full text-[#232426] 3xl:text-[160px] 3sm:text-[140px] font-semibold line-clamp-3">{name}</h1>
        <h1 className="mb-10">{artists} .</h1>
      </div>

      <div className="w-[50%] relative self-center">
        <PlayCurrentMusicWrap
          thumbnailUrl={thumbnailUrl}
          name={name!}
          artists={artists!}
          player={player}
          basicStyle="w-[70%] mr-[140px]"
          icon={<PiArrowsInThin />}
          onClick={() => {
            setOpenFullScreenCurrentPlayDetail(false);
          }}
          smallIconStyle="text-[1.5rem]"
          playCurrentMusicSetStyle="w-full mt-20 mb-14"
          playIconStyle="p-6 text-[2.8rem]"
          prevNextIconStyle="p-4 text-[1.4rem]"
        />
        <Lp
          thumbnailUrl={thumbnailUrl}
          basicStyle="w-[70%] absolute top-[4%] right-[-5%] z-[-1]"
          thumbnailStyle="w-[40%] top-[50%] mt-[-22%] left-[50%] ml-[-20%]"
          thumbnailStyle2="w-[30%] top-[50%] mt-[-17%] left-[50%] ml-[-15%]"
        />
      </div>

      <div className="w-[25%] h-full p-4 box-border self-end text-right text-[1.5rem] flex flex-col justify-between">
        <NextTrack data={nextTrack as Track} isCurrentPlaylistHidden="hidden" />

        <div>
          <div className="mb-20">
            <p className="inline-block bg-[#232426] text-white py-2 pl-2 pr-14 mb-2">I was being</p>
            <br />
            <p className="inline-block bg-[#232426] text-white py-2 pl-2 2xl:pr-40 3sm:pr-20">drawn to you.</p>
          </div>

          <p className="text-[1.75rem]">
            You just tell me what you want,
            <br />
            and
            <br />
            I’ll be that for you.
          </p>
        </div>
      </div>
    </div>
  );
}
