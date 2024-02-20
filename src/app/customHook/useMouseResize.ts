'use client';

import { useEffect, useRef, useState } from 'react';
import { SidebarWidthState } from '../recoil/atoms/atom';
import { useSetRecoilState } from 'recoil';

// interface useMouseResizeProps {
//   title: string;
//   MIN_WIDTH: number;
//   DEFAULT_WIDTH: number;
//   MAX_WIDTH: number;
//   isResized: React.MutableRefObject<boolean>;
// }

export default function useMouseResize(title: string) {
  const setSidebarWidth = useSetRecoilState(SidebarWidthState);

  const isResized = useRef(false);
  const isResized2 = useRef(false);

  const titleBoolean = title === 'sidebarWidth';
  const type: string = titleBoolean ? 'sidebarWidth' : 'currentPlayDetailWidth';

  const MIN_WIDTH = titleBoolean ? 72 : 280;
  const MAX_WIDTH = titleBoolean ? 1480 : 420;
  const DEFAULT_WIDTH = titleBoolean ? 72 : 420;

  const [width, setWidth] = useState<number>(
    typeof Window !== 'undefined' && localStorage.getItem(type)
      ? Number(localStorage.getItem(type))
      : typeof Window !== 'undefined' && !localStorage.getItem(type)
        ? DEFAULT_WIDTH
        : 0,
  );

  useEffect(() => {
    localStorage.setItem(type, String(width));

    if (width && titleBoolean) {
      setSidebarWidth(Number(width));
    }
  }, [width]);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      if (titleBoolean && !isResized.current) {
        return;
      } else if (!titleBoolean && !isResized2.current) {
        return;
      }

      setWidth((previousWidth) => {
        const newWidth = titleBoolean ? previousWidth + e.movementX / 2 : previousWidth - e.movementX / 2;
        const isWidthInRange = newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH;
        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener('mouseup', () => {
      isResized.current = false;
      isResized2.current = false;
    });
  }, []);

  return { width, setWidth, isResized, isResized2 };
}
