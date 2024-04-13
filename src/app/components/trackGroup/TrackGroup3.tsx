// oftenListenData와 같은 구조에서 사용

import { OftenListenData } from '@/app/types/api-responses/home';
import Image from 'next/image';
import Link from 'next/link';

interface TrackGroupProps {
  data: OftenListenData;
}

export default function TrackGroup3({ data }: TrackGroupProps) {
  return (
    <Link
      href={
        {
          // pathname: `/playlist/${data.id}`,
        }
      }
      key={data.id}
      className="w-full p-3 box-border bg-[rgb(35,36,38)] rounded-2xl border-[2px] border-solid border-[#232426] shadow-lg flex items-center gap-x-5 text-white cursor-pointer font-bold hover:bg-[rgba(35,36,38,0.1)] hover:text-[#232426] transition-all duration-700"
    >
      <Image className="w-16 h-16 rounded-xl" width={64} height={64} src={data.thumbnail} alt="playlist_thumbnail" />
      <p className="line-clamp-2">{data.title}</p>
    </Link>
  );
}
