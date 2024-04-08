import Image from 'next/image';
import { LibraryMyLibraryItem } from '../../types/api-responses/library';
import { MuwithObjectType } from '../../types/api-responses/global';

interface MyLibraryDataProps {
  width: number;
  data: LibraryMyLibraryItem;
}

export default function MyLibraryData({ width, data }: MyLibraryDataProps) {
  return (
    <div
      className={`${width > 130 ? 'bg-[#171818] px-2 pt-2 pb-4 mb-2' : 'p-[4px] mb-1'} box-border rounded-lg text-[1rem] text-white text-left cursor-pointer`}
    >
      <Image
        className={`${data.type === MuwithObjectType.ARTIST ? 'rounded-full' : 'rounded-lg'} ${width > 130 && 'mb-3'} w-[96%] mx-auto shadow-lg`}
        width={1000}
        height={1000}
        src={data.thumbnail}
        alt="playlist_thumbnail"
      />

      {width > 130 && (
        <>
          <p className="font-bold line-clamp-1">{data.title}</p>
          <p className="text-[#a1a1a1] text-[0.875rem] line-clamp-1">{data.description}</p>
        </>
      )}
    </div>
  );
}
