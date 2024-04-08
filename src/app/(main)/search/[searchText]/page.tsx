import { fetchSpotifySearchData } from '@/app/api/spotify';
import RecommenedList from '@/app/components/recommendedList/RecommenedList';
import TrackGroup from '@/app/components/trackGroup/TrackGroup';
import TrackGroup2 from '@/app/components/trackGroup/TrackGroup2';
import { MuwithObjectType } from '@/app/types/api-responses/global';
import { getDescription } from '@/utilities';

export default async function SearchResult({ params }: { params: { searchText: string } }) {
  const searchResultParam = decodeURIComponent(params.searchText);
  const searchResult = await fetchSpotifySearchData(searchResultParam);
  const { artists, albums, tracks, playlists } = searchResult;

  const artist = artists.items.find((item) => item.name.toUpperCase().includes(searchResultParam.toUpperCase()));
  const slicesTracks = tracks.items.slice(0, 5);

  return (
    <div className="w-full pl-6 pr-3 py-10 box-border">
      <div className="w-full mt-6">
        <div className="w-full flex gap-x-10">
          {artist && (
            <div className={`${artist ? 'block' : 'hidden'} w-[200px]`}>
              <h1 className="mb-2 text-[1.5rem] font-semibold line-clamp-1">{artist?.name}</h1>
              <TrackGroup
                id={artist.id}
                image={artist.thumbnailUrl}
                title={artist.name}
                type={MuwithObjectType.ARTIST}
                description={getDescription(MuwithObjectType.ARTIST, artist)}
              />
            </div>
          )}

          {slicesTracks.length > 0 && (
            <div className={`${artist ? 'w-calc_3' : 'w-full'}`}>
              <h1 className="mb-2 text-[1.5rem] font-semibold">곡</h1>

              <div>
                {slicesTracks.map((track) => (
                  <TrackGroup2
                    key={track.id}
                    data={track}
                    idxWidthStyle="hidden"
                    imgWidthStyle="w-full"
                    albumTitleWidthStyle="hidden"
                    formatDateStyle="hidden"
                    trackIdArr={[track.id]}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {albums.items.length > 0 && (
          <RecommenedList type={MuwithObjectType.ALBUM} title="앨범" datas={albums.items} isSlicedData={true} />
        )}
        {artists.items.length > 0 && (
          <RecommenedList type={MuwithObjectType.ARTIST} title="아티스트" datas={artists.items} isSlicedData={true} />
        )}
        {playlists.items.length > 0 && (
          <RecommenedList
            type={MuwithObjectType.PLAYLIST}
            title="플레이리스트"
            datas={playlists.items}
            isSlicedData={true}
          />
        )}
      </div>
    </div>
  );
}
