'use client';

import { useState, useEffect, useRef } from 'react';
import { MIN_MENU_TITLE_WIDTH } from '../layout-constants';
import MyLibrary from './MyLibrary';
import SidebarMenu from './SidebarMenu';
import { AppPage } from '../types';
import useMouseResize from '../customHook/useMouseResize';

export default function Sidebar() {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { width, setWidth, isResized } = useMouseResize('sidebarWidth');

  const isHiddenMenuTitle = MIN_MENU_TITLE_WIDTH > width;

  useEffect(() => {
    setIsClient(true);
  }, []);

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
