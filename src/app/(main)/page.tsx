import {
  fetchKpopDanceMusic,
  fetchListenAgainRecommened,
  fetchOftenListenData,
  fetchRecentlyHeard,
} from '../api/home_api';
import OftenListenMusic from '../components/main/OftenListenMusic';
import RecommenedList from '../components/recommendedList/RecommenedList';
import { MuwithObjectType } from '../types/api-responses/global';

export default async function Home() {
  const date = new Date();
  const hour = date.getHours();
  const timeComment =
    hour > 6 && hour < 12
      ? '아침 햇살이 창문을 통해 살며시 들어오는 희망 가득한 아침입니다.'
      : hour > 12 && hour < 18
        ? '따뜻한 햇빛이 마음까지 환하게 하는 오후입니다.'
        : '별이 가득한 하늘 아래, 편안한 밤입니다.';

  const listenAgainData = await fetchListenAgainRecommened();
  const oftenListenData = await fetchOftenListenData();
  const recentlyHeardData = await fetchRecentlyHeard();
  const kpopDanceMusicData = await fetchKpopDanceMusic();

  return (
    <div className="w-full px-6 pt-6 pb-24 box-border overflow-scroll">
      <h1 className="mb-5 text-[2.4rem] font-bold ">{timeComment}</h1>

      <OftenListenMusic datas={oftenListenData} />
      <RecommenedList title="다시 들어보세요" datas={listenAgainData.data} isSlicedData={true} />
      <RecommenedList title="최근 재생한 항목" datas={recentlyHeardData.data} isSlicedData={true} />
      <RecommenedList
        type={MuwithObjectType.PLAYLIST}
        title="K-pop 댄스음악"
        datas={kpopDanceMusicData}
        isSlicedData={true}
      />
    </div>
  );
}
