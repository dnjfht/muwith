import { fetchSpotifySearchData } from '@/app/api/spotify';
import RecommenedList from '@/app/components/RecommenedList';
import TrackGroup from '@/app/components/TrackGroup';
import TrackGroup2 from '@/app/components/TrackGroup2';
import { ArtistType, TrackType } from '@/app/types';

export default async function SearchResult({ params }: { params: { searchText: string } }) {
  const searchResultParam = decodeURIComponent(params.searchText);
  const searchResult = await fetchSpotifySearchData(searchResultParam);
  const { artists, albums, tracks, playlists } = searchResult;

  const artist = artists.items.find((item: ArtistType) =>
    item.name.toUpperCase().includes(searchResultParam.toUpperCase()),
  );
  const slicesTracks = tracks.items.slice(0, 5);

  return (
    <div className="w-full pl-6 pr-3 py-10 box-border">
      <div className="w-full mt-6">
        <div className="w-full flex gap-x-10">
          {artist && (
            <div className="w-[200px]">
              <h1 className="mb-2 text-[1.5rem] font-semibold line-clamp-1">{artist?.name}</h1>
              <TrackGroup id={artist.id} image={artist.thumbnailUrl} title={artist.name} type="artist" />
            </div>
          )}

          {slicesTracks.length > 0 && (
            <div className="w-calc_3">
              <h1 className="mb-2 text-[1.5rem] font-semibold">곡</h1>

              <div>{slicesTracks?.map((track: TrackType) => <TrackGroup2 key={track.id} data={track} />)}</div>
            </div>
          )}
        </div>

        {albums.items.length > 0 && <RecommenedList title="앨범" datas={albums.items} type="album" />}
        {artists.items.length > 0 && <RecommenedList title="아티스트" datas={artists.items} type="artist" />}
        {playlists.items.length > 0 && <RecommenedList title="플레이리스트" datas={playlists.items} type="playlist" />}
      </div>
    </div>
  );
}
