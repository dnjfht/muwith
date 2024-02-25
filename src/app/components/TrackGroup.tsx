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
      className="w-full px-4 pt-4 pb-8 mb-6 box-border bg-[#232426] border-[2px] border-solid border-[#232426] rounded-2xl text-white shadow-[0px_6px_6px_2px_rgba(0,0,0,0.2)] hover:bg-[rgba(35,36,38,0.1)] transition-all duration-700 group"
    >
      <Image
        className={`${data.type === 'artist' ? 'rounded-full' : 'rounded-xl'} w-full object-cover aspect-square shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]`}
        width={1000}
        height={1000}
        src={data.thumbnail}
        alt="plalylist_thumbnail"
      />
      <p className="mt-6 line-clamp-1 font-semibold group-hover:text-[#232426]">{data.title}</p>
      <p className="mt-1 text-[0.9375rem] text-[#a1a1a1] line-clamp-1 group-hover:text-[#838384]">{data.description}</p>
    </Link>
  );
}
