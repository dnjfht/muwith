'use client';

import { IoTimeOutline } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';
import { PageWidthState } from '../../../recoil/atoms/atom';
import { usePathname } from 'next/navigation';
import { AppPage } from '../../../types/app';

export default function TableListTop({ isPlaylist, isAlbum }: { isPlaylist?: boolean; isAlbum?: boolean }) {
  const pageWidth = useRecoilValue(PageWidthState);
  const pathName = usePathname();
  const isSearchPageWidth = pageWidth && pathName.includes(AppPage.SEARCH);

  const titleWidthStyle = isPlaylist ? 'w-[30%]' : isAlbum ? 'w-[90%]' : 'w-[50%]';
  const albumStyle = isPlaylist ? 'w-[30%]' : isAlbum ? 'hidden' : 'w-[40%]';
  const addDateStyle = isPlaylist ? 'block w-[30%]' : 'hidden';

  return (
    <div
      className={`${pathName.includes(AppPage.SEARCH) && 'fixed top-[160px]'} px-4 py-3 box-border bg-gradient-to-r from-[#232426] to-[rgba(0,0,0,0.2)] rounded-t-lg flex items-center text-white text-[0.875rem]`}
      style={{ width: `${isSearchPageWidth ? `${pageWidth - 48}px` : 'w-[90%]'}` }}
    >
      <div className="w-[4%] text-[1rem]">#</div>
      <div className={`${titleWidthStyle}`}>제목</div>
      <div className={`${albumStyle}`}>앨범</div>
      <div className={`${addDateStyle}`}>추가한 날짜</div>
      <div className="w-[6%] text-[1.4rem] flex justify-center">
        <IoTimeOutline />
      </div>
    </div>
  );
}
