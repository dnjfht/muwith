// Spotify 검색 기능

export const fetchSpotifySearchData = async (searchString: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL2}/search?keyword=${encodeURIComponent(searchString)}&types=artist,album,track,playlist&limit=50`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const fetchSpotifyPlalylistSetsData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL2 + '/playlist-set'}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};

export const fetchSpotifyAlbumDetailData = async (type: string, id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL2 + `/${type}/` + id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
  }
};
