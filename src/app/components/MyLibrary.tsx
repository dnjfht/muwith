'use client';

import { BsFileMusic, BsFileMusicFill } from 'react-icons/bs';
import { CiCirclePlus } from 'react-icons/ci';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

interface Props {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
}

type Library_data = {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
};

const getMyLibrary = async () => {
  return await fetch('http://localhost:9999/04be41a9-0594-4033-aeb4-6ca1ac8e2e49')
    .then((res) => res.json())
    .then((result) => result.my_library);
};

const MyLibrary = ({ width, setWidth }: Props) => {
  const { data } = useQuery({
    queryKey: ['my_library'],
    queryFn: () => getMyLibrary(),
    suspense: true,
    staleTime: 5 * 1000,
  });

  console.log(data);

  return (
    <div className="mt-2 p-[6px] box-border bg-[#ebebeb] rounded-lg shadow-lg text-[1.5rem]">
      <div className={`${width > 250 && 'flex justify-between items-center'}`}>
        <button
          onClick={(e) => {
            e.preventDefault();

            setWidth(72);
          }}
          className={`${
            width > 250 ? 'justify-start gap-x-3' : 'w-full justify-center'
          } p-[14px] box-border flex flex-row items-center text-[rgba(40,40,40,0.3)] hover:text-[rgba(40,40,40,1)] transition-all duration-500 font-bold`}
        >
          {width > 250 ? <BsFileMusicFill /> : <BsFileMusic />}

          <p className={`${width > 250 ? 'block' : 'hidden'} text-[1rem]`}>내 라이브러리</p>
        </button>

        {width > 250 && (
          <button className="px-[14px] text-[rgba(40,40,40,0.3)] hover:text-[rgba(40,40,40,1)] transition-all duration-500">
            <CiCirclePlus />
          </button>
        )}
      </div>

      {width > 250 && (
        <>
          <div className="px-[14px] box-border flex justify-between items-center">
            <input
              className="w-[70%] h-[32px] py-2 px-3 box-border bg-transparent border-[2px] border-solid border-[#171818] rounded-3xl placeholder:text-[0.875rem] placeholder:text-[#a1a1a1] text-[0.875rem]"
              type="text"
              placeholder="내 라이브러리에서 검색"
            />
            <button className="text-[#727274] text-[0.875rem]" type="button" disabled={false}>
              최근
            </button>
          </div>
        </>
      )}

      <div
        className={`${width > 250 && width < 340 ? 'grid grid-cols-2 gap-x-[3px]' : width > 340 && width < 500 ? 'grid grid-cols-3 gap-x-[3px]' : width > 500 && width < 700 ? 'grid grid-cols-4 gap-x-[3px]' : width > 700 && width < 1000 ? 'grid grid-cols-6 gap-x-[3px]' : width > 1000 && width < 1120 ? 'grid grid-cols-7 gap-x-[3px]' : width > 1120 && width < 1260 ? 'grid grid-cols-8 gap-x-[3px]' : width > 1260 && width < 1400 ? 'grid grid-cols-9 gap-x-[3px]' : width > 1400 ? 'grid grid-cols-10 gap-x-[3px]' : 'flex flex-col items-center'} w-full py-[6px]`}
      >
        {data &&
          data?.map((data: Library_data) => {
            return (
              <div
                key={data.id}
                className={`${width > 130 ? 'bg-[#171818] px-2 pt-2 pb-4 mb-2' : 'p-[4px] mb-1'} box-border rounded-lg text-[1rem] text-white text-left cursor-pointer`}
              >
                <Image
                  className={`${data.description === '아티스트' ? 'rounded-full' : 'rounded-lg'} ${width > 130 && 'mb-3'} w-[96%] mx-auto shadow-lg`}
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
          })}
      </div>
    </div>
  );
};

export default MyLibrary;
