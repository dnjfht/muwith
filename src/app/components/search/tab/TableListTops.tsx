'use client';

import { IoTimeOutline } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';
import { PageWidthState } from '../../../recoil/atoms/atom';
import { usePathname } from 'next/navigation';
import { AppPage } from '../../../types/app';
import { MuwithObjectType } from '../../../types/api-responses/global';

export default function TableListTop({ type }: { type?: string }) {
  const pageWidth = useRecoilValue(PageWidthState);
  const pathName = usePathname();

  const playlistDetailType = !pathName.includes(AppPage.SEARCH) && type === MuwithObjectType.PLAYLIST;
  const albumDetailType = !pathName.includes(AppPage.SEARCH) && type === MuwithObjectType.ALBUM;

  return (
    <div
      className={`${pathName.includes(AppPage.SEARCH) && 'fixed top-[160px]'} px-4 py-3 box-border bg-gradient-to-r from-[#232426] to-[rgba(0,0,0,0.2)] rounded-t-lg flex items-center text-white text-[0.875rem]`}
      style={{ width: `${pageWidth && pathName.includes(AppPage.SEARCH) ? `${pageWidth - 48}px` : 'w-[90%]'}` }}
    >
      <div className="w-[4%] text-[1rem]">#</div>
      <div className={`${playlistDetailType ? 'w-[30%]' : albumDetailType ? 'w-[90%]' : 'w-[50%]'}`}>제목</div>
      <div className={`${playlistDetailType ? 'w-[30%]' : albumDetailType ? 'hidden' : 'w-[40%]'}`}>앨범</div>
      <div className={`${playlistDetailType ? 'block w-[30%]' : 'hidden'}`}>추가한 날짜</div>
      <div className="w-[6%] text-[1.4rem] flex justify-center">
        <IoTimeOutline />
      </div>
    </div>
  );
}
