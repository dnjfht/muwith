'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { HiOutlineHome, HiHome } from 'react-icons/hi2';
import { GoSearch } from 'react-icons/go';
import { BsFileMusic } from 'react-icons/bs';
import { CiCirclePlus } from 'react-icons/ci';

const [minWidth, maxWidth, defaultWidth] = [72, 1480, 72];

export default function Sidebar() {
  const [width, setWidth] = useState<number>(
    localStorage.getItem('sidebarWidth') ? parseInt(localStorage.getItem('sidebarWidth')!) : defaultWidth,
  );

  const isResized = useRef(false);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;

        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

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

  return (
    <div className="flex">
      <div style={{ width: `${width / 16}rem` }} className="grid grid-rows-[1fr_6fr]">
        <div
          className={`${
            width > 250 ? 'items-start' : 'items-center'
          } p-5 box-border bg-[#ebebeb] rounded-lg shadow-lg flex flex-col justify-center gap-y-4 text-[1.5rem]`}
        >
          <Link href="/" className={`${pathname === '/' ? '' : 'text-[#a6a6a6]'} flex items-center gap-x-3`}>
            {pathname === '/' ? <HiHome /> : <HiOutlineHome />}

            <p className={`${width > 250 ? 'block' : 'hidden'} text-[1rem]`}>홈</p>
          </Link>

          <Link
            href="/search"
            className={`${pathname === '/search' ? '' : 'text-[#a6a6a6]'} flex items-center gap-x-3`}
          >
            <GoSearch />

            <p className={`${width > 250 ? 'block' : 'hidden'} text-[1rem]`}>검색하기</p>
          </Link>
        </div>

        <div className="mt-2 p-[6px] box-border bg-[#ebebeb] rounded-lg shadow-lg text-[1.5rem]">
          <div className={`${width > 250 && 'flex justify-between items-center'}`}>
            <button
              onClick={(e) => {
                e.preventDefault();

                setWidth(72);
              }}
              className={`${
                width > 250 ? 'justify-start gap-x-3' : 'w-full justify-center'
              } p-[14px] box-border flex flex-row items-center text-[#a6a6a6]`}
            >
              <BsFileMusic />

              <p className={`${width > 250 ? 'block' : 'hidden'} text-[1rem]`}>내 라이브러리</p>
            </button>

            {width > 250 && (
              <button className="px-[14px] text-[#a6a6a6]">
                <CiCirclePlus />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Handle */}
      <div
        className="w-2 cursor-col-resize"
        onMouseDown={() => {
          isResized.current = true;
        }}
      />
    </div>
  );
}
