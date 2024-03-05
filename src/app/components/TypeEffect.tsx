'use client';

import { ReactTyped } from 'react-typed';
import { MuwithObjectType } from '../types/api-responses/global';

export default function TypeEffect({ type, data }: { type: string; data: { name: string } }) {
  const textBgColor = {
    [MuwithObjectType.TRACK]: 'bg-gradient-to-r from-[#ff077b] to-[#f6abd2]',
    [MuwithObjectType.ALBUM]: 'bg-gradient-to-r from-cyan-500 to-[#6cb16b]',
    [MuwithObjectType.PLAYLIST]: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    [MuwithObjectType.ARTIST]: 'bg-gradient-to-r from-[#ffa72d] to-[#a3d4b3]',
    [MuwithObjectType.PLAYLIST_SET]: 'bg-gradient-to-r from-[#ff077b] to-[#f6abd2]',
    [MuwithObjectType.ETC]: 'bg-gradient-to-r from-[#ff077b] to-[#f6abd2]',
  }[type];

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
