'use client';

import { ReactTyped } from 'react-typed';

export default function TypeEffect({ backgroundStyle, data }: { backgroundStyle?: string; data: { name: string } }) {
  backgroundStyle ??= 'bg-gradient-to-r from-[#ff077b] to-[#f6abd2]';

  return (
    <>
      {data && data.name && (
        <h1 className={`${backgroundStyle} mt-5 text-[3rem] text-[#232426] font-bold whitespace-pre-wrap line-clamp-1`}>
          <ReactTyped
            strings={[data.name]}
            typeSpeed={50} //타이핑 속도
            backSpeed={25} //타이핑 지우는 속도
            loop={true} //반복할건지
            startDelay={500}
            backDelay={1000}
          />
        </h1>
      )}
    </>
  );
}
