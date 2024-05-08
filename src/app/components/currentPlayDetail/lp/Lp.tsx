import Image from 'next/image';

interface LpProps {
  thumbnailUrl: string;
  basicStyle: string;
  thumbnailStyle: string;
  thumbnailStyle2: string;
}

export default function Lp({ thumbnailUrl, basicStyle, thumbnailStyle, thumbnailStyle2 }: LpProps) {
  return (
    <div className={`${basicStyle} animate-spin`}>
      <Image
        className="w-[92%] mx-auto aspect-square"
        width={450}
        height={450}
        src="/image/lp_record.png"
        alt="record_img"
      />
      <Image
        className={`${thumbnailStyle} aspect-square absolute rounded-full shadow-[5px_5px_8px_4px_rgba(0,0,0,0.3)] opacity-90`}
        width={500}
        height={500}
        src={thumbnailUrl}
        alt="lp_record_artist_img"
      />
      <Image
        className={`${thumbnailStyle2} aspect-square absolute rounded-full shadow-[5px_5px_8px_4px_rgba(0,0,0,0.3)]`}
        width={500}
        height={500}
        src={thumbnailUrl}
        alt="lp_record_artist_img"
      />
      <div className="w-1 h-1 bg-white rounded-full shadow-[2px_2px_4px_4px_rgba(0,0,0,0.3)] absolute top-[50%] mt-[-10px] left-[50%] ml-[-1px]" />
    </div>
  );
}
