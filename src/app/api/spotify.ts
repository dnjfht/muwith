// Spotify api를 사용하기 위하여 클라이언트 자격 증명 요청

export const fetchSpotifyAccessToken = async () => {
  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_SPOTIFY_API_CLIENT_PW}`,
      cache: 'no-store',
    });
    const result = await res.json();
    return result.access_token;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Spotify 검색 기능

export const fetchSpotifySearchData = async (spotifyAccessToken: string, searchString: string) => {
  try {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchString)}&type=album,track,playlist&limit=50`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${spotifyAccessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};
