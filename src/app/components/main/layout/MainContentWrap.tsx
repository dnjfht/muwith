'use client';

import React, { useEffect, useRef } from 'react';
import { PageResponsiveNumState, PageWidthState } from '../../../recoil/atoms/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';

// window 객체에 직접 onYouTubeIframeAPIReady 메소드를 추가하는 부분은 TypeScript에서 에러를 발생시킬 수 있습니다.
// TypeScript는 기본적으로 window 객체에 이와 같은 메소드가 없다고 가정하기 때문입니다.
// 이를 해결하기 위해, window 객체에 대한 커스텀 인터페이스를 선언해야 합니다.
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

interface MainContentWrapProps {
  children: React.ReactNode;
}

export default function MainContentWrap({ children }: MainContentWrapProps) {
  const pageWidthRef = useRef<HTMLDivElement | null>(null);

  const [pageWidth, setPageWidth] = useRecoilState(PageWidthState);

  // ref 객체는 불변성을 유지하지 않습니다. 즉, ref.current의 값이 변경되더라도 React는 이를 감지하지 못하고 리렌더링을 트리거하지 않습니다.
  // => 이 문제를 해결하기 위해 ResizeObserver API를 사용. ResizeObserver는 요소의 크기 변화를 감시하고, 크기가 변경될 때마다 콜백 함수를 호출하는 API입니다.
  useEffect(() => {
    // ResizeObserver의 콜백에서 entry.contentRect.width를 사용하여 요소의 너비를 가져와 pageWidth 상태를 업데이트 합니다.
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setPageWidth(entry.contentRect.width);
      }
    });

    if (pageWidthRef.current) {
      resizeObserver.observe(pageWidthRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const setPageResponsiveNum = useSetRecoilState(PageResponsiveNumState);

  const responsiveNum =
    pageWidth >= 1630
      ? 8
      : pageWidth < 1630 && pageWidth >= 1430
        ? 7
        : pageWidth < 1430 && pageWidth >= 1330
          ? 6
          : pageWidth < 1330 && pageWidth >= 1230
            ? 5
            : pageWidth < 1230 && pageWidth >= 730
              ? 4
              : pageWidth < 730 && pageWidth >= 530
                ? 3
                : 2;

  useEffect(() => {
    setPageResponsiveNum(responsiveNum);
  }, [setPageResponsiveNum, responsiveNum]);

  return (
    <div ref={pageWidthRef} className="w-full box-border bg-[#ebebeb] rounded-lg shadow-lg overflow-hidden">
      {children}
    </div>
  );
}
