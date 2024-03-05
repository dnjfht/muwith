import { fetchSpotifyPlalylistSetsData } from '@/app/api/spotify';
import RecommenedList from '@/app/components/RecommenedList';
import { MuwithObjectType } from '@/app/types/api-responses/global';

export default async function Search() {
  const playlistSets = await fetchSpotifyPlalylistSetsData();

  return (
    <div className="w-full p-6 box-border">
      <RecommenedList title="모두 둘러보기" type={MuwithObjectType.ETC} datas={playlistSets} />
    </div>
  );
}
