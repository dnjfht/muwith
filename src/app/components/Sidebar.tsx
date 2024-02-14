'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { MIN_MENU_TITLE_WIDTH } from '../layout-constants';
import MyLibrary from './MyLibrary';
import SidebarMenu from './SidebarMenu';
import { AppPage } from '../types';

export default function Sidebar() {
  const MIN_WIDTH = 72;
  const MAX_WIDTH = 1480;
  const DEFAULT_WIDTH = 72;

  const [isClient, setIsClient] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(
    typeof Window !== 'undefined' && localStorage.getItem('sidebarWidth')
      ? Number(localStorage.getItem('sidebarWidth'))
      : typeof Window !== 'undefined' && !localStorage.getItem('sidebarWidth')
        ? DEFAULT_WIDTH
        : 0,
  );

  const isHiddenMenuTitle = MIN_MENU_TITLE_WIDTH > width;
  const isResized = useRef(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebarWidth', String(width));
  }, [width]);

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

  const userId: string = '04be41a9-0594-4033-aeb4-6ca1ac8e2e49';

  return (
    <>
      {isClient && (
        <div className="flex">
          <div style={{ width: `${width / 16}rem` }} className="grid grid-rows-[1fr_6fr]">
            <div
              className={`${
                isHiddenMenuTitle ? 'items-center' : 'items-start'
              } p-5 box-border bg-[#ebebeb] rounded-lg shadow-lg flex flex-col justify-center gap-y-4 text-[1.5rem] font-bold`}
            >
              <SidebarMenu LinkHref={AppPage.HOME} menuTitle="홈" isHiddenMenuTitle={isHiddenMenuTitle} />
              <SidebarMenu LinkHref={AppPage.SEARCH} menuTitle="검색하기" isHiddenMenuTitle={isHiddenMenuTitle} />
            </div>

            <MyLibrary width={width} setWidth={setWidth} isHiddenMenuTitle={isHiddenMenuTitle} />
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
