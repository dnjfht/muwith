'use client';

import Image from 'next/image';
import { formatDate, timeString } from '../../layout-constants';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { CurrentPlayListDataState, CurrentPlaylistTitle, CurrentTrackIndexState } from '../../recoil/atoms/atom';
import { DEFAULT_PICTURE } from '../../constants';
import Button from './button/Button';
import { TrackInAlbum } from '@/app/types/api-responses/album';
import { TrackInPlaylist } from '@/app/types/api-responses/playlist';
import { TrackInSearch } from '@/app/types/api-responses/search';
import { ArtistTopTrack } from '@/app/types/api-responses/artist';

import { CiMusicNote1 } from 'react-icons/ci';
import { PiHeart } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';

interface TrackType {
  idx?: number;
  data: TrackInSearch | TrackInPlaylist | TrackInAlbum | ArtistTopTrack;
  isGroupTrack?: boolean;
  isHiddenIcon?: string;
  wrapStyle?: string;
  idxWidthStyle?: string;
  imgWidthStyle?: string;
  albumTitleWidthStyle?: string;
  formatDateStyle?: string;
  buttonWrapStyle?: string;
  trackIdArr: string[];
  isHiddenThumbnail?: string;
  currentPlaylistTitle?: string;
}

export default function TrackGroup2({
  idx,
  data,
  isGroupTrack,
  isHiddenIcon,
  wrapStyle,
  idxWidthStyle,
  imgWidthStyle,
  albumTitleWidthStyle,
  formatDateStyle,
  buttonWrapStyle,
  trackIdArr,
  isHiddenThumbnail,
  currentPlaylistTitle,
}: TrackType) {
  const router = useRouter();

  const setCurrentPlaylist = useSetRecoilState(CurrentPlayListDataState);
  const setCurrentTrackIndex = useSetRecoilState(CurrentTrackIndexState);
  const setCurrentPlaylistTitle = useSetRecoilState(CurrentPlaylistTitle);

  const thumbnail = (data as TrackInPlaylist | TrackInSearch | ArtistTopTrack).album?.thumbnailUrl ?? DEFAULT_PICTURE;

  const artistArr = data.artists?.map((artist) => artist.name);
  const artistList = artistArr?.join(', ');
  const albumTitle = (data as TrackInPlaylist | TrackInSearch).album?.name;

  return (
    <div
      tabIndex={0}
      className={`${wrapStyle} w-full px-3 py-2 box-border rounded-lg flex justify-between group hover:bg-[#1d1e22] hover:text-white transition-all duration-700 font-normal focus:bg-[#1d1e22] focus:text-white`}
    >
      <p className={`${isHiddenIcon}`}>
        <CiMusicNote1 />
      </p>

      <div
        className={`${idxWidthStyle} flex items-center`}
        onClick={() => {
          setCurrentPlaylist(trackIdArr);
          setCurrentPlaylistTitle('');
          localStorage.setItem('currentPlaylistTitle', '');
          if (!isGroupTrack) {
            setCurrentTrackIndex(0);
          } else if (isGroupTrack && (idx || idx === 0)) {
            setCurrentTrackIndex(idx);
            setCurrentPlaylistTitle(currentPlaylistTitle ?? '');
            localStorage.setItem('currentPlaylistTitle', currentPlaylistTitle ?? '');
          }
        }}
      >
        {idx}
      </div>
      <div
        onClick={() => {
          router.push(`/track/${data.id}`);
        }}
        className={`${imgWidthStyle} flex items-center gap-x-4 cursor-pointer`}
      >
        <Image
          className={`${isHiddenThumbnail} w-10 h-10 object-cover rounded-xl`}
          src={thumbnail}
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

      <div className={`${albumTitleWidthStyle} flex items-center`}>
        <p>{albumTitle}</p>
      </div>

      <div className={`${formatDateStyle} w-[30%] flex items-center`}>
        <p>{formatDate((data as TrackInPlaylist).addedAt)}</p>
      </div>

      <div className={`${buttonWrapStyle} flex items-center gap-x-4`}>
        <Button icon={<PiHeart />} basicStyle="text-[1.2em]" />
        <p className="text-[#a1a1a1] text-[0.875rem]">{timeString(data.duration)}</p>
        <Button icon={<RiMoreLine />} basicStyle="text-white" />
      </div>
    </div>
  );
}
