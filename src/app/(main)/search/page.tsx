import { fetchSpotifyPlalylistSetsData } from '@/app/api/spotify';
import PlaylistSetList from '@/app/components/search/PlaylistSetList';

export default async function Search() {
  const playlistSets = await fetchSpotifyPlalylistSetsData();

  return (
    <div className="w-full p-6 box-border">
      <PlaylistSetList title="모두 둘러보기" datas={playlistSets} />
    </div>
  );
}
