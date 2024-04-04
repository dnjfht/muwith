'use client';

import Image from 'next/image';
import { PiHeart } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';
import { timeString } from '../../layout-constants';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { CurrentPlayListDataState, CurrentTrackIndexState } from '../../recoil/atoms/atom';
import { DEFAULT_PICTURE } from '../../constants';
import Button from './button/Button';

interface TrackType {
  idx?: number;
  id: string;
  name: string;
  duration: number;
  thumbnail?: string;
  wrapStyle?: string;
  idxWidthStyle?: string;
  imgWidthStyle?: string;
  albumTitleWidthStyle?: string;
  formatDateStyle?: string;
  buttonWrapStyle?: string;
  trackIdArr?: string[];
  artistList?: string;
  formatDate?: string;
  isHiddenThumbnail?: string;
  playlistDetailType?: boolean;
  albumDetailType?: boolean;
  albumTitle?: string;
}

export default function TrackGroup2({
  idx,
  id,
  name,
  duration,
  thumbnail,
  wrapStyle,
  idxWidthStyle,
  imgWidthStyle,
  albumTitleWidthStyle,
  formatDateStyle,
  buttonWrapStyle,
  trackIdArr,
  artistList,
  formatDate,
  isHiddenThumbnail,
  albumTitle,
}: TrackType) {
  const router = useRouter();

  const setCurrentPlaylist = useSetRecoilState(CurrentPlayListDataState);
  const setCurrentTrackIndex = useSetRecoilState(CurrentTrackIndexState);

  const thumbnailImg = thumbnail ?? DEFAULT_PICTURE;

  return (
    <div
      tabIndex={0}
      className={`${wrapStyle} w-full px-3 py-2 box-border rounded-lg flex justify-between group hover:bg-[#1d1e22] hover:text-white transition-all duration-700 font-normal focus:bg-[#1d1e22] focus:text-white`}
    >
      <div
        className={`${idxWidthStyle} flex items-center`}
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
          router.push(`/track/${id}`);
        }}
        className={`${imgWidthStyle} flex items-center gap-x-4 cursor-pointer`}
      >
        <Image
          className={`${isHiddenThumbnail} w-10 h-10 object-cover rounded-xl`}
          src={thumbnailImg}
          width={1000}
          height={1000}
          alt="trackImg"
        />

        <div className="flex flex-col">
          <p>{name}</p>
          <p className="mt-[-4px] text-[#a1a1a1] text-[0.875rem] group-hover:text-white group-focus:text-white">
            {artistList}
          </p>
        </div>
      </div>

      <div className={`${albumTitleWidthStyle} flex items-center`}>
        <p>{albumTitle}</p>
      </div>

      <div className={`${formatDateStyle} w-[30%] flex items-center`}>
        <p>{formatDate}</p>
      </div>

      <div className={`${buttonWrapStyle} flex items-center gap-x-4`}>
        <Button icon={<PiHeart />} basicStyle="text-[1.2em]" />
        <p className="text-[#a1a1a1] text-[0.875rem]">{timeString(duration)}</p>
        <Button icon={<RiMoreLine />} basicStyle="text-white" />
      </div>
    </div>
  );
}
