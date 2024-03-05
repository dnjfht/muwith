'use client';

import Image from 'next/image';

import { PiHeart } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';
import { formatDate, timeString } from '../layout-constants';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { CurrentPlayListDataState, CurrentTrackIndexState } from '../recoil/atoms/atom';
import { AppPage } from '../types/app';
import { TrackInSearch } from '../types/api-responses/search';
import { TrackInPlaylist } from '../types/api-responses/playlist';
import { DEFAULT_PICTURE } from '../constants';
import { MuwithObjectType } from '../types/api-responses/global';

interface TrackType {
  data: TrackInSearch | TrackInPlaylist;
  idx?: number;
  type?: string;
  datas?: DataType[];
}

interface DataType {
  id: string;
}

export default function TrackGroup2({ data, idx, type, datas }: TrackType) {
  const setCurrentPlaylist = useSetRecoilState(CurrentPlayListDataState);
  const setCurrentTrackIndex = useSetRecoilState(CurrentTrackIndexState);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useParams()?.searchType;

  const artistArr = data.artists?.map((artist) => artist.name);
  const artistList = artistArr?.join(', ');
  const albumTitle = data?.album?.name;
  const trackIdArr = datas?.map((data) => data.id);

  const playlistDetailType = !pathName.includes(AppPage.SEARCH) && type === MuwithObjectType.PLAYLIST;
  const albumDetailType = !pathName.includes(AppPage.SEARCH) && type === MuwithObjectType.ALBUM;
  const artistDetailType = !pathName.includes(AppPage.SEARCH) && type === MuwithObjectType.ARTIST;

  return (
    <div
      tabIndex={0}
      className={`${(playlistDetailType || albumDetailType || artistDetailType) && 'text-white py-4'} w-full px-3 py-2 box-border rounded-lg flex justify-between group hover:bg-[#1d1e22] hover:text-white transition-all duration-700 font-normal focus:bg-[#1d1e22] focus:text-white`}
    >
      <div
        className={`${searchParams === 'tracks' || albumDetailType || playlistDetailType || artistDetailType ? 'block w-[4%]' : 'hidden'} flex items-center`}
        onClick={() => {
          if (idx || idx === 0) {
            setCurrentPlaylist(trackIdArr as string[]);
            setCurrentTrackIndex(idx);
            console.log(`hello, I'm ${idx} index!`);
          }
        }}
      >
        {idx}
      </div>
      <div
        onClick={() => {
          router.push(`/track/${data.id}`);
        }}
        className={`${searchParams === 'tracks' ? 'w-[50%]' : playlistDetailType ? 'w-[30%]' : albumDetailType ? 'w-[90%]' : 'w-full'} flex items-center gap-x-4 cursor-pointer`}
      >
        <Image
          className={`${albumDetailType && 'hidden'} w-10 h-10 object-cover rounded-xl`}
          src={data?.album?.thumbnailUrl ? data?.album?.thumbnailUrl : DEFAULT_PICTURE}
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

      <div
        className={`${searchParams === 'tracks' ? 'w-[40%] block' : playlistDetailType ? 'w-[30%] block' : 'hidden'} flex items-center`}
      >
        <p>{albumTitle}</p>
      </div>

      <div className={`${playlistDetailType ? 'block' : 'hidden'} w-[30%] flex items-center`}>
        <p>{formatDate(data.addedAt)}</p>
      </div>

      <div className={`${searchParams === 'tracks' && 'w-[6%]'} flex items-center gap-x-4`}>
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
