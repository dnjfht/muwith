import { fetchSpotifySearchData } from '@/app/api/spotify';
import RecommenedList from '@/app/components/recommendedList/RecommenedList';
import TableListTop from '@/app/components/search/tab/TableListTops';
import TrackGroup2 from '@/app/components/trackGroup/TrackGroup2';
import { Album } from '@/app/types/api-responses/album';
import { MuwithObjectType } from '@/app/types/api-responses/global';
import { TrackInSearch } from '@/app/types/api-responses/search';

interface SearchTypeProps {
  params: { searchText: string; searchType: string };
}

export default async function SearchType({ params }: SearchTypeProps) {
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
      <div className={`${searchType === 'tracks' ? 'block' : 'hidden'} w-full mt-20 pl-6 pr-3 box-border`}>
        <TableListTop />

        {(datas.items as TrackInSearch[]).map((data, index) => (
          <TrackGroup2
            key={data.id}
            idx={index}
            data={data}
            idxWidthStyle={isSearchParamsTrack ? 'block w-[4%]' : 'hidden'}
            imgWidthStyle={isSearchParamsTrack ? 'w-[50%]' : 'w-full'}
            albumTitleWidthStyle={isSearchParamsTrack ? 'w-[40%] block' : 'hidden'}
            formatDateStyle="hidden"
            buttonWrapStyle={isSearchParamsTrack ? 'w-[6%]' : ''}
            trackIdArr={[data.id]}
          />
        ))}
      </div>

      <div className={`${searchType === 'tracks' ? 'hidden' : 'block'} w-full py-4 pl-6 pr-3 box-border`}>
        <RecommenedList type={type} datas={datas.items as Album[]} />
      </div>
    </>
  );
}
