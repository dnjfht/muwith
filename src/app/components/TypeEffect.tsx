'use client';

import { ReactTyped } from 'react-typed';

export default function TypeEffect({ type, data }: { type: string; data: { name: string } }) {
  const textBgColor =
    type === 'playlist'
      ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
      : type === 'album'
        ? 'bg-gradient-to-r from-cyan-500 to-[#6cb16b]'
        : type === 'artist'
          ? 'bg-gradient-to-r from-[#ffa72d] to-[#a3d4b3]'
          : 'bg-gradient-to-r from-[#ff077b] to-[#f6abd2]';

  return (
    <>
      {data && data.name && (
        <h1 className={`${textBgColor} mt-5 text-[3rem] text-[#232426] font-bold whitespace-pre-wrap line-clamp-1`}>
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
