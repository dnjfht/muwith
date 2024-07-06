'use client';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  CurrentPlayListDataState,
  CurrentPlaylistTitle,
  CurrentTrackDataState,
  CurrentTrackIndexState,
  OpenCurrentPlayTrackDetailState,
  SidebarWidthState,
} from '../../recoil/atoms/atom';
import useMouseResize from '../../customHook/useMouseResize';
import { DEFAULT_PICTURE } from '@/app/constants';
import NextTrack from './NextTrack';
import { fetchSpotifyTrackDetailData } from '@/app/api/spotify';
import { Track } from '@/app/types/api-responses/track';
import PlayCurrentMusicWrap from '../PlayCurrentMusicWrap/PlayCurrentMusicWrap';
import Lp from './lp/Lp';

import { GoX } from 'react-icons/go';
import { RiMoreLine } from 'react-icons/ri';

interface CurrentPlayDetailProps {
  player: YT.Player | null;
}

export default function CurrentPlayDetail({ player }: CurrentPlayDetailProps) {
  const currentTrackData = useRecoilValue(CurrentTrackDataState);
  const currentPlaylistTitle = useRecoilValue(CurrentPlaylistTitle);

  const sidebarWidth = useRecoilValue(SidebarWidthState);

  const thumbnailUrl = currentTrackData?.album.thumbnailUrl ?? DEFAULT_PICTURE;
  const name = currentTrackData?.name;
  const artists = currentTrackData?.artists.map((artist) => artist.name).join(', ');

  const [isClient, setIsClient] = useState<boolean>(false);
  const { width, isResized2 } = useMouseResize('currentPlayDetailWidth');
  const [nextTrack, setNextTrack] = useState({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [openCurrentPlayTrackDetail, setOpenCurrentPlayTrackDetail] = useRecoilState(OpenCurrentPlayTrackDetailState);
  const openCurrentPlayTrackDetailBoolen = currentTrackData && openCurrentPlayTrackDetail;

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
    <>
      {isClient && openCurrentPlayTrackDetailBoolen && (
        <div className="h-full flex">
          {/* Handle */}
          <div
            className="w-2 cursor-col-resize"
            onMouseDown={() => {
              isResized2.current = true;
            }}
          />

          <div
            style={{ width: `${width / 16}rem` }}
            className={`${sidebarWidth >= 1200 ? 'hidden' : 'block'} h-full px-6 py-6 box-border bg-[#ebebeb] rounded-lg overflow-hidden`}
          >
            <div className="w-full flex items-center justify-between">
              <h1 className="w-[82%] font-semibold">{currentPlaylistTitle}</h1>
              <button
                onClick={() => {
                  setOpenCurrentPlayTrackDetail(false);
                }}
                className="w-9 h-9 bg-[#232426] rounded-full flex items-center justify-center text-white text-[1.4rem]"
              >
                <GoX />
              </button>
            </div>

            <div className="w-full h-[76vh] px-3 box-border overflow-x-hidden overflow-y-scroll scrollbar-hide">
              <div className="w-full mt-6 relative">
                <Lp
                  thumbnailUrl={thumbnailUrl}
                  basicStyle="relative"
                  thumbnailStyle="w-[43%] top-[50%] mt-[-5rem] left-[50%] ml-[-4.8rem]"
                  thumbnailStyle2="w-[36%] top-[50%] mt-[-4.2rem] left-[50%] ml-[-4rem]"
                />

                <PlayCurrentMusicWrap
                  thumbnailUrl={thumbnailUrl}
                  artists={artists!}
                  name={name!}
                  player={player}
                  basicStyle="w-full absolute top-[50%] left-[50%] ml-[-50%]"
                  icon={<RiMoreLine />}
                  playCurrentMusicSetStyle="w-full mt-8 mb-4"
                  playIconStyle="p-3 text-[1.6rem]"
                  prevNextIconStyle="p-[8px] text-[1rem]"
                />
              </div>

              <div className="mt-52">
                <NextTrack data={nextTrack as Track} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
