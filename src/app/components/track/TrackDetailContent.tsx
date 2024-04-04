import '../../(main)//layout.css';
import RecommenedList from '../RecommenedList';
import TrackLylics from '../TrackLylics';
import DetailContentTop from '../DetailContentTop';
import { MuwithObjectType } from '../../types/api-responses/global';
import { Track } from '../../types/api-responses/track';

interface DetailContentType {
  type: MuwithObjectType;
  data: Track;
}

export default async function TrackDetailContent({ type, data }: DetailContentType) {
  return (
    <div className="w-full min-h-[44vh] p-6 box-border bg-gradient-to-b from-[#2c2d2e] to-[#ffc9dc]">
      <DetailContentTop type={type} data={data} />

      <div>
        <h1 className="mb-2 text-[1.5rem] font-semibold text-white">가사</h1>
        <TrackLylics />
      </div>

      <div className={`${(data as Track).artists.length === 1 && 'flex gap-x-4'} w-full`}>
        <RecommenedList title="아티스트" datas={data.artists} type={MuwithObjectType.ARTIST} />

        <div className={`${(data as Track).artists.length === 1 ? 'w-calc_3' : 'w-full'} py-6`}>될까?</div>
      </div>
    </div>
  );
}
