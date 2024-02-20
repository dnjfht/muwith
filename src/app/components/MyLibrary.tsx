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
  function getMenuColumns(width: number) {
    if (isHiddenMenuTitle && width > 0 && width < 340) {
      return 'grid-cols-1';
    } else if (!isHiddenMenuTitle && width > 0 && width < 340) {
      return 'grid-cols-2';
    } else if (width >= 340 && width < 500) {
      return 'grid-cols-3';
    } else if (width >= 500 && width < 660) {
      return 'grid-cols-4';
    } else if (width >= 660 && width < 800) {
      return 'grid-cols-5';
    } else if (width >= 800 && width < 1000) {
      return 'grid-cols-6';
    } else if (width >= 1000 && width < 1120) {
      return 'grid-cols-7';
    } else if (width >= 1120 && width < 1260) {
      return 'grid-cols-8';
    } else if (width >= 1260 && width < 1400) {
      return 'grid-cols-9';
    } else if (width >= 1400) {
      return 'grid-cols-10';
    }
  }

  const menuColumns = getMenuColumns(width);

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

      <div className={`grid ${menuColumns} gap-x-[3px] w-full py-[6px]`}>
        <MyLibraryData width={width} />
      </div>
    </div>
  );
}
