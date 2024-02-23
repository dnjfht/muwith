// 아티스트 상세정보 가져오기
export const fetchArtistDetail = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/artist', { cache: 'no-store' });
  const result = await res.json();
  return await result[id];
};
