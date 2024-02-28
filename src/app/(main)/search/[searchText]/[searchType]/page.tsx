import { fetchSpotifyAccessToken, fetchSpotifySearchData } from '@/app/api/spotify';
import RecommenedList from '@/app/components/RecommenedList';
import TableListTop from '@/app/components/TableListTops';
import TrackGroup2 from '@/app/components/TrackGroup2';
import { TrackType } from '@/app/types';

export default async function SearchType({ params }: { params: { searchText: string; searchType: string } }) {
  const searchResultParam = decodeURIComponent(params.searchText);
  const searchType = params.searchType;

  const spotifyAccessToken = await fetchSpotifyAccessToken();
  const searchResult = await fetchSpotifySearchData(spotifyAccessToken, searchResultParam);
  const datas =
    searchType === 'albums'
      ? searchResult.albums
      : searchType === 'playlists'
        ? searchResult.playlists
        : searchType === 'tracks'
          ? searchResult.tracks
          : searchResult.artists;

  return (
    <>
      {searchType === 'tracks' ? (
        <div className="w-full mt-8 pl-6 pr-3 box-border">
          <TableListTop />
          {datas.items?.map((data: TrackType, index: number) => <TrackGroup2 key={data.id} idx={index} data={data} />)}
        </div>
      ) : (
        <div className="w-full py-4 pl-6 pr-3 box-border bg-yellow-300">
          <RecommenedList datas={datas.items} />
        </div>
      )}
    </>
  );
}
