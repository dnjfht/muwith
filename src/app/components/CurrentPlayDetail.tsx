'use client';

import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SidebarWidthState } from '../recoil/atoms/atom';
import useMouseResize from '../customHook/useMouseResize';

export default function CurrentPlayDetail() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { width, isResized2 } = useMouseResize('currentPlayDetailWidth');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const sidebarWidth = useRecoilValue(SidebarWidthState);

  return (
    <>
      {isClient && (
        <div className="flex">
          {/* Handle */}
          <div
            className="w-2 cursor-col-resize"
            onMouseDown={() => {
              isResized2.current = true;
            }}
          />

          <div
            style={{ width: `${width / 16}rem` }}
            className={`${sidebarWidth >= 1200 ? 'hidden' : 'block'} px-6 py-6 box-border bg-[#ebebeb] rounded-lg overflow-hidden`}
          >
            {width}
          </div>
        </div>
      )}
    </>
  );
}
