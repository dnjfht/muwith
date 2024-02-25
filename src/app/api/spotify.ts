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
