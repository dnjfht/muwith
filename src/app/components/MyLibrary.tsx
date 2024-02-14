'use client';

import { BsFileMusic, BsFileMusicFill } from 'react-icons/bs';
import { CiCirclePlus } from 'react-icons/ci';

import MyLibraryData from './MyLibraryData';

interface MyLibraryProps {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  isHiddenMenuTitle: boolean;
}

export default function MyLibrary({ width, setWidth, isHiddenMenuTitle }: MyLibraryProps) {
  return (
    <div className="mt-2 p-[6px] box-border bg-[#ebebeb] rounded-lg shadow-lg text-[1.5rem]">
      <div className={`${!isHiddenMenuTitle && 'flex justify-between items-center'}`}>
        <button
          onClick={() => {
            setWidth(72);
          }}
          className={`${
            !isHiddenMenuTitle ? 'justify-start gap-x-3' : 'w-full justify-center'
          } p-[14px] box-border flex flex-row items-center text-[rgba(40,40,40,0.3)] hover:text-[rgba(40,40,40,1)] transition-all duration-500 font-bold`}
        >
          {!isHiddenMenuTitle ? <BsFileMusicFill /> : <BsFileMusic />}

          <p className={`${!isHiddenMenuTitle ? 'block' : 'hidden'} text-[1rem]`}>내 라이브러리</p>
        </button>

        {!isHiddenMenuTitle && (
          <button className="px-[14px] text-[rgba(40,40,40,0.3)] hover:text-[rgba(40,40,40,1)] transition-all duration-500">
            <CiCirclePlus />
          </button>
        )}
      </div>

      {!isHiddenMenuTitle && (
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
        className={`${!isHiddenMenuTitle && width < 340 ? 'grid grid-cols-2 gap-x-[3px]' : width > 340 && width < 500 ? 'grid grid-cols-3 gap-x-[3px]' : width > 500 && width < 700 ? 'grid grid-cols-4 gap-x-[3px]' : width > 700 && width < 1000 ? 'grid grid-cols-6 gap-x-[3px]' : width > 1000 && width < 1120 ? 'grid grid-cols-7 gap-x-[3px]' : width > 1120 && width < 1260 ? 'grid grid-cols-8 gap-x-[3px]' : width > 1260 && width < 1400 ? 'grid grid-cols-9 gap-x-[3px]' : width > 1400 ? 'grid grid-cols-10 gap-x-[3px]' : 'flex flex-col items-center'} w-full py-[6px]`}
      >
        <MyLibraryData width={width} />
      </div>
    </div>
  );
}
