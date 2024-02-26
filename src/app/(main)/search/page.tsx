import { fetchSpotifyAccessToken, fetchSpotifySearchData } from '@/app/api/spotify';

export default async function Search() {
  const spotifyAccessToken = await fetchSpotifyAccessToken();
  const searchResult = await fetchSpotifySearchData(spotifyAccessToken, 'riize');
  console.log(searchResult);
  const { albums } = searchResult;
  console.log('album임', albums);

  return (
    <div>
      <h1>Search</h1>
      <p>{spotifyAccessToken}</p>
    </div>
  );
}
