'use client';

import { IoTimeOutline } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';
import { PageWidthState } from '../recoil/atoms/atom';

export default function TableListTop() {
  const pageWidth = useRecoilValue(PageWidthState);

  return (
    <div
      className="px-4 py-3 box-border bg-gradient-to-r from-[#232426] to-[rgba(0,0,0,0.2)] rounded-t-lg flex items-center text-white text-[0.875rem] fixed top-[160px]"
      style={{ width: `${pageWidth ? `${pageWidth - 48}px` : 'w-[90%]'}` }}
    >
      <div className="w-[4%] text-[1rem]">#</div>
      <div className="w-[50%]">제목</div>
      <div className="w-[40%]">앨범</div>
      <div className="w-[6%] text-[1.4rem] flex justify-center">
        <IoTimeOutline />
      </div>
    </div>
  );
}
