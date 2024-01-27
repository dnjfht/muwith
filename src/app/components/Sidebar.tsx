'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import SidebarMenu from './SidebarMenu';
import MyLibrary from './MyLibrary';

const MIN_WIDTH = 72;
const MAX_WIDTH = 1480;
const DEFAULT_WIDTH = 72;

export default function Sidebar() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(
    typeof Window !== 'undefined' && localStorage.getItem('sidebarWidth')
      ? Number(localStorage.getItem('sidebarWidth'))
      : typeof Window !== 'undefined' && !localStorage.getItem('sidebarWidth')
        ? DEFAULT_WIDTH
        : 0,
  );

  const isResized = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('sidebarWidth')) {
      setWidth(Number(localStorage.getItem('sidebarWidth')));
    } else {
      setWidth(DEFAULT_WIDTH);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;
        const isWidthInRange = newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH;
        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener('mouseup', () => {
      isResized.current = false;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarWidth', String(width));
  }, [width]);

  const pathname = usePathname();

  const userId: string = '04be41a9-0594-4033-aeb4-6ca1ac8e2e49';

  return (
    <>
      {isClient && (
        <div className="flex">
          <div style={{ width: `${width / 16}rem` }} className="grid grid-rows-[1fr_6fr]">
            <div
              className={`${
                width > 250 ? 'items-start' : 'items-center'
              } p-5 box-border bg-[#ebebeb] rounded-lg shadow-lg flex flex-col justify-center gap-y-4 text-[1.5rem] font-bold`}
            >
              <SidebarMenu LinkHref="/" menuTitle="홈" width={width} />
              <SidebarMenu LinkHref="/search" menuTitle="검색하기" width={width} />
            </div>

            <MyLibrary width={width} setWidth={setWidth} />
          </div>

          {/* Handle */}
          <div
            className="w-2 cursor-col-resize"
            onMouseDown={() => {
              isResized.current = true;
            }}
          />
        </div>
      )}
    </>
  );
}
