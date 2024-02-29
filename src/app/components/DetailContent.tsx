import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { PiHeart, PiHeartFill } from 'react-icons/pi';
import { RiMoreLine } from 'react-icons/ri';
import DetailModuleContent from './DetailModuleContent';
import TableListTop from './TableListTops';
import TrackGroup2 from './TrackGroup2';

interface DetailContentType {
  type: string;
  artistsName?: string;
}

export default function DetailContent({ type, data, artistsName }: DetailContentType) {
  const bgColor =
    type === 'track'
      ? 'bg-gradient-to-b from-[#2c2d2e] to-[#ffacc9]'
      : type === 'album'
        ? 'bg-gradient-to-b from-[#2c2d2e] to-[#a1d4a0]'
        : type === 'playlist'
          ? 'bg-gradient-to-b from-[#2c2d2e] to-[#a1d2de]'
          : 'bg-gradient-to-b from-[#2c2d2e] to-[#ffb685]';

  const trackData = (type === 'album' || type === 'playlist') && data?.tracks;

  return (
    <div className={`${bgColor} w-full min-h-[320px] p-6 box-border`}>
      <div className="w-full mb-8 flex items-center gap-x-5 text-[2rem] text-white">
        <button className="w-14 h-14 bg-[#1d1e22] border-[1px] border-solid border-white rounded-full flex items-center justify-center text-white">
          <BsFillPlayFill />
        </button>
        {type !== 'artist' && (
          <>
            <button>
              <PiHeart />
            </button>
            <button className="text-[#a1a1a1]">
              <RiMoreLine />
            </button>
          </>
        )}
      </div>

      {type === 'track' && (
        <>
          <DetailModuleContent type={type} title="가사" moduleType="lylics" />
        </>
      )}

      {(type === 'playlist' || type === 'album') && (
        <>
          <TableListTop type={type} />

          {trackData?.map((track, idx: number) => {
            return <TrackGroup2 key={track.id} data={track} idx={idx} type={type} artistsName={artistsName} />;
          })}
        </>
      )}
    </div>
  );
}
