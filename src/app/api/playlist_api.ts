// 플레이리스트 가져오기
export const fetchPlaylist = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/playlist', { cache: 'no-store' });
  const result = await res.json();
  return await result[id];
};

// 현재 듣고 있는 플레이리스트 가져오기
export const fetchCurrentPlaylist = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/04be41a9-0594-4033-aeb4-6ca1ac8e2e49', {
    cache: 'no-store',
  });
  const result = await res.json();
  return await result.current_playlist;
};
