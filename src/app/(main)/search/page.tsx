import { fetchSpotifyPlalylistSetsData } from '@/app/api/spotify';
import RecommenedList from '@/app/components/RecommenedList';

export default async function Search() {
  const playlistSets = await fetchSpotifyPlalylistSetsData();
  console.log('playlistSets', playlistSets);

  return (
    <div className="w-full p-6 box-border">
      <RecommenedList title="모두 둘러보기" datas2={playlistSets} />
    </div>
  );
}
