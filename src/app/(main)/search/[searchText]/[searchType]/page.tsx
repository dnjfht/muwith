import { fetchSpotifySearchData } from '@/app/api/spotify';
import RecommenedList from '@/app/components/RecommenedList';
import TableListTop from '@/app/components/TableListTops';
import TrackGroup2 from '@/app/components/TrackGroup2';
import { Album } from '@/app/types/api-responses/album';
import { MuwithObjectType } from '@/app/types/api-responses/global';
import { TrackInSearch } from '@/app/types/api-responses/search';

export default async function SearchType({ params }: { params: { searchText: string; searchType: string } }) {
  const searchResultParam = decodeURIComponent(params.searchText);
  const searchType = params.searchType;
  const isSearchParamsTrack = searchType === 'tracks';

  const searchResult = await fetchSpotifySearchData(searchResultParam);
  const datas =
    searchType === 'albums'
      ? searchResult.albums
      : searchType === 'playlists'
        ? searchResult.playlists
        : searchType === 'tracks'
          ? searchResult.tracks
          : searchResult.artists;

  const type =
    {
      albums: MuwithObjectType.ALBUM,
      playlists: MuwithObjectType.PLAYLIST,
      tracks: MuwithObjectType.TRACK,
      artists: MuwithObjectType.ARTIST,
    }[searchType] ?? MuwithObjectType.ETC;

  return (
    <>
      {searchType === 'tracks' ? (
        <div className="w-full mt-20 pl-6 pr-3 box-border">
          <TableListTop />
          {(datas.items as TrackInSearch[]).map((data, index) => (
            <TrackGroup2
              key={data.id}
              idx={index}
              data={data}
              thumbnail={data.album.thumbnailUrl}
              isHiddenFormatDate={true}
              albumTitle={data.album.name}
              isSearchParamsTrack={isSearchParamsTrack}
            />
          ))}
        </div>
      ) : (
        <div className="w-full py-4 pl-6 pr-3 box-border">
          <RecommenedList datas={datas.items as Album[]} type={type} />
        </div>
      )}
    </>
  );
}
