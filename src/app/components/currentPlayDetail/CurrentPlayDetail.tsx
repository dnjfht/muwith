'use client';

import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { OpenCurrentPlayTrackDetailState, SidebarWidthState } from '../../recoil/atoms/atom';
import useMouseResize from '../../customHook/useMouseResize';

import { GoX } from 'react-icons/go';
import Image from 'next/image';

interface CurrentPlayDetailProps {
  currentPlayList: {
    current_playlist_title: string;
    current_play_list: CurrentPlayList[];
  };
}

interface CurrentPlayList {
  id: string;
  type: string;
  title: string;
  thumbnail: string;
  artist: string;
  album: string;
  duration: string;
  isLikeSong: boolean;
}

export default function CurrentPlayDetail({ currentPlayList }: CurrentPlayDetailProps) {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { width, isResized2 } = useMouseResize('currentPlayDetailWidth');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sidebarWidth = useRecoilValue(SidebarWidthState);

  const [openCurrentPlayTrackDetail, setOpenCurrentPlayTrackDetail] = useRecoilState(OpenCurrentPlayTrackDetailState);

  const { current_play_list } = currentPlayList ?? { current_play_list: [] };
  const { thumbnail, title, artist } = current_play_list?.[0] ?? {};
  const openCurrentPlayTrackDetailBoolen = current_play_list && openCurrentPlayTrackDetail;

  return (
    <>
      {isClient && openCurrentPlayTrackDetailBoolen && (
        <div className="flex">
          {/* Handle */}
          <div
            className="w-2 cursor-col-resize"
            onMouseDown={() => {
              isResized2.current = true;
            }}
          />

          <div
            style={{ width: `${width / 16}rem` }}
            className={`${sidebarWidth >= 1200 ? 'hidden' : 'block'} px-6 py-6 box-border bg-[#ebebeb] rounded-lg overflow-hidden`}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">{currentPlayList.current_playlist_title}</h1>
              <button
                onClick={() => {
                  setOpenCurrentPlayTrackDetail(false);
                }}
                className="w-9 h-9 bg-[#232426] rounded-full flex items-center justify-center text-white text-[1.4rem]"
              >
                <GoX />
              </button>
            </div>

            <div className="relative">
              <div className="animate-spin relative">
                <Image
                  className="w-[450px] aspect-square"
                  width={450}
                  height={450}
                  src="/image/lp_record.png"
                  alt="record_img"
                />

                <div>
                  <Image
                    className="w-[8rem] h-[8rem] aspect-square absolute top-[50%] mt-[-4.5rem] left-[50%] ml-[-4rem] rounded-full shadow-[5px_5px_8px_4px_rgba(0,0,0,0.3)] opacity-90"
                    width={500}
                    height={500}
                    src={thumbnail}
                    alt="lp_record_artist_img"
                  />
                  <Image
                    className="w-[7rem] h-[7rem] aspect-square absolute top-[50%] mt-[-4rem] left-[50%] ml-[-3.5rem] rounded-full shadow-[5px_5px_8px_4px_rgba(0,0,0,0.3)]"
                    width={500}
                    height={500}
                    src={thumbnail}
                    alt="lp_record_artist_img"
                  />
                  <div className="w-1 h-1 bg-white rounded-full shadow-[2px_2px_4px_4px_rgba(0,0,0,0.3)] absolute top-[50%] mt-[-10px] left-[50%] ml-[-1px]" />
                </div>
              </div>

              <div className="w-[104%] aspect-square p-4 box-border bg-gradient-170deg rounded-lg shadow-[5px_5px_8px_4px_rgba(0,0,0,0.4)] absolute top-[50%] left-[50%] ml-[-52%] text-white">
                <div className="w-full flex items-center gap-x-4">
                  <Image
                    className="w-[46%] aspect-square rounded-lg shadow-[2px_2px_10px_6px_rgba(0,0,0,0.3)]"
                    width={500}
                    height={500}
                    src={thumbnail}
                    alt="track_img"
                  />
                  <div>
                    <p className="text-[#a1a1a1]">{artist}</p>
                    <h1 className="mt-2 text-[1.75rem] font-semibold">{title}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
