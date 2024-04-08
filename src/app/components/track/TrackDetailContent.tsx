import '../../(main)//layout.css';
import RecommenedList from '../recommendedList/RecommenedList';
import TrackLylics from './TrackLylics';
import DetailContentTop from '../detail/DetailContentTop';
import { MuwithObjectType } from '../../types/api-responses/global';
import { Track } from '../../types/api-responses/track';
import { fetchSpotifyRecommendedTracksData } from '@/app/api/spotify';
import TrackGroup2 from '../trackGroup/TrackGroup2';
import MainText from '../text/MainText';
import SubText from '../text/SubText';

interface DetailContentType {
  data: Track;
}

export default async function TrackDetailContent({ data }: DetailContentType) {
  const recommendationsByTracks = await fetchSpotifyRecommendedTracksData(data.id, 5);

  const isFlex = data.artists.length === 1;

  return (
    <div className="w-full min-h-[44vh] p-6 box-border bg-gradient-to-b from-[#2c2d2e] to-[#ffc9dc]">
      <DetailContentTop trackIds={[data.id]} />

      <div>
        <MainText text="가사" basicStyle="text-white" />
        <TrackLylics />
      </div>

      <div className={`${isFlex ? 'flex gap-x-8' : null} w-full`}>
        <RecommenedList
          type={MuwithObjectType.ARTIST}
          title="아티스트"
          titleColorStyle="text-white"
          showAllColorStyle="text-[#c7c7c7]"
          datas={data.artists}
          isSlicedData={true}
        />

        <div className={`${data.artists.length === 1 ? 'w-calc_3' : 'w-full'} py-6`}>
          <div className="flex gap-x-3 items-baseline">
            <MainText text="추천" basicStyle="text-white" />
            <SubText text="이 곡 기준" basicStyle="text-[0.875rem]" />
          </div>

          {recommendationsByTracks.map((track) => {
            return (
              <TrackGroup2
                key={track.id}
                data={track}
                wrapStyle="text-white"
                idxWidthStyle="hidden"
                imgWidthStyle="w-full"
                albumTitleWidthStyle="hidden"
                formatDateStyle="hidden"
                trackIdArr={[track.id]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
