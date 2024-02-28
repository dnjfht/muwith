'use client';

import Image from 'next/image';

import { PiHeart } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';
import { timeString } from '../layout-constants';
import { ArtistType, ListImageType } from '../types';
import { useParams } from 'next/navigation';

interface TrackType {
  data: {
    id: string;
    name: string;
    artists: ArtistType[];
    album: {
      name: string;
      thumbnailUrl: string;
    };
    duration: number;
  };
  idx?: number;
}

export default function TrackGroup2({ data, idx }: TrackType) {
  const artistName = data.artists?.map((artist) => artist.name);
  const artistList = artistName.join(', ');
  const albumTitle = data.album.name;

  const searchParams = useParams()?.searchType;

  return (
    <div
      tabIndex={0}
      className="w-full px-3 py-2 box-border rounded-lg flex justify-between group hover:bg-[#1d1e22] hover:text-white transition-all duration-700 font-normal focus:bg-[#1d1e22] focus:text-white"
    >
      <div className={`${searchParams === 'tracks' ? 'block w-[4%]' : 'hidden'} flex items-center`}>{idx}</div>
      <div className={`${searchParams === 'tracks' ? 'w-[50%]' : 'w-full'} flex items-center gap-x-4`}>
        <Image
          className="w-10 h-10 object-cover rounded-xl"
          src={data.album.thumbnailUrl}
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

      <div className={`${searchParams === 'tracks' ? 'w-[40%] block' : 'hidden'} flex items-center`}>
        <p>{albumTitle}</p>
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
