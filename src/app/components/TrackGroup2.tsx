'use client';

import Image from 'next/image';
import { PiHeart } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';
import { timeString } from '../layout-constants';
import { usePathname, useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { CurrentPlayListDataState, CurrentTrackIndexState } from '../recoil/atoms/atom';
import { TrackInSearch } from '../types/api-responses/search';
import { TrackInPlaylist } from '../types/api-responses/playlist';
import { DEFAULT_PICTURE } from '../constants';
import { TrackInAlbum } from '../types/api-responses/album';
import { AppPage } from '../types/app';
import { MuwithObjectType } from '../types/api-responses/global';

interface TrackType {
  data: TrackInSearch | TrackInPlaylist | TrackInAlbum;
  idx?: number;
  type?: string;
  thumbnail?: string;
  trackIdArr?: string[];
  formatDate?: string;
  isHiddenThumbnail?: string;
  isHiddenFormatDate?: boolean;
  playlistDetailType?: boolean;
  albumDetailType?: boolean;
  albumTitle?: string;
  isSearchParamsTrack?: boolean;
}

export default function TrackGroup2({
  data,
  idx,
  type,
  thumbnail,
  trackIdArr,
  formatDate,
  isHiddenThumbnail,
  isHiddenFormatDate,
  albumTitle,
  isSearchParamsTrack,
}: TrackType) {
  const router = useRouter();
  const pathName = usePathname();

  const setCurrentPlaylist = useSetRecoilState(CurrentPlayListDataState);
  const setCurrentTrackIndex = useSetRecoilState(CurrentTrackIndexState);

  const isHiddenFormatDateClass = isHiddenFormatDate ? 'hidden' : '';

  const playlistDetailType = !pathName.includes(AppPage.SEARCH) && type === MuwithObjectType.PLAYLIST;
  const albumDetailType = !pathName.includes(AppPage.SEARCH) && type === MuwithObjectType.ALBUM;
  const artistDetailType = !pathName.includes(AppPage.SEARCH) && type === MuwithObjectType.ARTIST;

  const artistArr = data.artists?.map((artist) => artist.name);
  const artistList = artistArr?.join(', ');
  const thumbnailImg = thumbnail ?? DEFAULT_PICTURE;

  const wrapStyle = playlistDetailType || albumDetailType || artistDetailType ? 'text-white py-4' : '';
  const idxWidth = isSearchParamsTrack || albumDetailType || playlistDetailType ? 'block w-[4%]' : 'hidden';
  const imgWidth = isSearchParamsTrack
    ? 'w-[50%]'
    : playlistDetailType
      ? 'w-[30%]'
      : albumDetailType
        ? 'w-[90%]'
        : 'w-full';
  const albumTitleWidth = isSearchParamsTrack ? 'w-[40%] block' : playlistDetailType ? 'w-[30%] block' : 'hidden';

  return (
    <div
      tabIndex={0}
      className={`${wrapStyle} w-full px-3 py-2 box-border rounded-lg flex justify-between group hover:bg-[#1d1e22] hover:text-white transition-all duration-700 font-normal focus:bg-[#1d1e22] focus:text-white`}
    >
      <div
        className={`${idxWidth} flex items-center`}
        onClick={() => {
          if ((idx || idx === 0) && trackIdArr) {
            setCurrentPlaylist(trackIdArr);
            setCurrentTrackIndex(idx);
          } else if ((idx || idx === 0) && !trackIdArr) {
            setCurrentTrackIndex(idx);
          }
        }}
      >
        {idx}
      </div>
      <div
        onClick={() => {
          router.push(`/track/${data.id}`);
        }}
        className={`${imgWidth} flex items-center gap-x-4 cursor-pointer`}
      >
        <Image
          className={`${isHiddenThumbnail} w-10 h-10 object-cover rounded-xl`}
          src={thumbnailImg}
          width={1000}
          height={1000}
          alt="trackImg"
        />

        <div className="flex flex-col">
          <p>{data.name}</p>
          <p className="mt-[-4px] text-[#a1a1a1] text-[0.875rem] group-hover:text-white group-focus:text-white">
            {artistList}
          </p>
        </div>
      </div>

      <div className={`${albumTitleWidth} flex items-center`}>
        <p>{albumTitle}</p>
      </div>

      <div className={`${isHiddenFormatDateClass} w-[30%] flex items-center`}>
        <p>{formatDate}</p>
      </div>

      <div className={`${isSearchParamsTrack && 'w-[6%]'} flex items-center gap-x-4`}>
        <button className="group-hover:opacity-100 group-focus:opacity-100 text-[1.2rem] opacity-0">
          <PiHeart />
        </button>

        <p className="text-[#a1a1a1] text-[0.875rem]">{timeString(data.duration)}</p>

        <button className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 text-white">
          <RiMoreLine />
        </button>
      </div>
    </div>
  );
}
