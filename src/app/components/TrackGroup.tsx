import Image from 'next/image';
import { Playlist } from '../types';
import Link from 'next/link';

interface TrackGroupProps {
  data: Playlist;
}

export default function TrackGroup({ data }: TrackGroupProps) {
  return (
    <Link
      href={{ pathname: `/${data.type}/${data.id}` }}
      className="w-full px-4 pt-4 pb-8 mb-6 box-border bg-[#232426] rounded-2xl text-white shadow-[0px_6px_6px_2px_rgba(0,0,0,0.2)]"
    >
      <Image
        className={`${data.type === 'artist' ? 'rounded-full' : 'rounded-xl'} w-full object-cover aspect-square shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]`}
        width={1000}
        height={1000}
        src={data.thumbnail}
        alt="plalylist_thumbnail"
      />
      <p className="mt-6 line-clamp-1 font-semibold">{data.title}</p>
      <p className="mt-1 text-[0.9375rem] text-[#a1a1a1] line-clamp-1">{data.description}</p>
    </Link>
  );
}
