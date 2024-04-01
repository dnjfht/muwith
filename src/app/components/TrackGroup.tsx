'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DEFAULT_PICTURE } from '../constants';
import { MuwithObjectType } from '../types/api-responses/global';

interface TrackGroupProps {
  id: string;
  image?: string;
  title: string;
  type: MuwithObjectType;
  description: string;
}

export default function TrackGroup({ id, image, title, type, description }: TrackGroupProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/${type}/${id}`);
      }}
      className="w-full px-4 pt-4 pb-8 mb-6 box-border bg-[#232426] border-[2px] border-solid border-[#232426] rounded-2xl text-white shadow-[0px_6px_6px_2px_rgba(0,0,0,0.2)] hover:bg-[rgba(35,36,38,0.1)] transition-all duration-700 group cursor-pointer"
    >
      <Image
        className={`${type === MuwithObjectType.ARTIST ? 'rounded-full' : 'rounded-xl'} w-full object-cover aspect-square shadow-[6px_6px_6px_2px_rgba(0,0,0,0.3)]`}
        width={1000}
        height={1000}
        src={image ?? DEFAULT_PICTURE}
        alt="thumbnail"
      />
      <p className="mt-6 line-clamp-1 font-semibold group-hover:text-[#232426]">{title}</p>
      <p className="mt-1 text-[0.9375rem] text-[#a1a1a1] line-clamp-1 group-hover:text-[#838384]">{description}</p>
    </div>
  );
}
