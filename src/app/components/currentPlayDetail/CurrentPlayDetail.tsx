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
import Image from 'next/image';
import { DEFAULT_PICTURE } from '@/app/constants';
import PlayCurrentMusicSet from '../playCurrentMusicSet/PlayCurrentMusicSet';

import { GoX } from 'react-icons/go';
import NextTrack from './NextTrack';
import { fetchSpotifyTrackDetailData } from '@/app/api/spotify';
import { Track } from '@/app/types/api-responses/track';

interface CurrentPlayDetailProps {
  player: YT.Player | null;
}

export default function CurrentPlayDetail({ player }: CurrentPlayDetailProps) {
  const currentTrackData = useRecoilValue(CurrentTrackDataState);

  const thumbnailUrl = currentTrackData?.album.thumbnailUrl ?? DEFAULT_PICTURE;
  const name = currentTrackData?.name;
  const artists = currentTrackData?.artists.map((artist) => artist.name).join(', ');

  const [isClient, setIsClient] = useState<boolean>(false);
  const { width, isResized2 } = useMouseResize('currentPlayDetailWidth');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sidebarWidth = useRecoilValue(SidebarWidthState);

  const [openCurrentPlayTrackDetail, setOpenCurrentPlayTrackDetail] = useRecoilState(OpenCurrentPlayTrackDetailState);
  const openCurrentPlayTrackDetailBoolen = currentTrackData && openCurrentPlayTrackDetail;

  const currentPlaylistTitle = useRecoilValue(CurrentPlaylistTitle);

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
                <div className="animate-spin relative">
                  <Image
                    className="w-[92%] mx-auto aspect-square"
                    width={450}
                    height={450}
                    src="/image/lp_record.png"
                    alt="record_img"
                  />
                  <Image
                    className="w-[43%] aspect-square absolute top-[50%] mt-[-5rem] left-[50%] ml-[-4.8rem] rounded-full shadow-[5px_5px_8px_4px_rgba(0,0,0,0.3)] opacity-90"
                    width={500}
                    height={500}
                    src={thumbnailUrl}
                    alt="lp_record_artist_img"
                  />
                  <Image
                    className="w-[36%] aspect-square absolute top-[50%] mt-[-4.2rem] left-[50%] ml-[-4rem] rounded-full shadow-[5px_5px_8px_4px_rgba(0,0,0,0.3)]"
                    width={500}
                    height={500}
                    src={thumbnailUrl}
                    alt="lp_record_artist_img"
                  />
                  <div className="w-1 h-1 bg-white rounded-full shadow-[2px_2px_4px_4px_rgba(0,0,0,0.3)] absolute top-[50%] mt-[-10px] left-[50%] ml-[-1px]" />
                </div>

                <div className="w-full aspect-square p-4 box-border bg-gradient-170deg rounded-lg shadow-[5px_5px_8px_4px_rgba(0,0,0,0.4)] absolute top-[50%] left-[50%] ml-[-50%] text-white">
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
                    <PlayCurrentMusicSet player={player} wrapStyle="w-full" isPlayBar={false} />
                  </div>
                </div>
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
